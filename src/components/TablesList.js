"use client";

import React, { useState, useEffect, use } from "react";
import axiosInstance from "../../axiosConfig";
import { Table, Text, Button, AlertDialog, Flex } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import * as Form from "@radix-ui/react-form";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TablesList(props) {
  const [office, setOffice] = useState({});
  const [officesTables, setOfficesTables] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [showCapacity, setShowCapacity] = useState(true);
  const { id, status } = props;
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const officeData = await axiosInstance.get(`/admin/offices/${id}`);
        setOffice(officeData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [status]);

  //Use Effect para obtener las mesas de una Oficina
  useEffect(() => {
    const fetchTablesData = async () => {
      try {
        const tablesData = await axiosInstance.get(
          `/admin/offices/${id}/tables`
        );
        setOfficesTables(tablesData.data);

        // Cargar las capacidades desde la base de datos en inputValues
        const capacities = {};
        tablesData.data?.forEach((table) => {
          capacities[table.id] = table.capacity;
        });
        setInputValues(capacities);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          router.push("/not-found");
        } else {
          console.error(error);
        }
      }
    };
    fetchTablesData();
  }, [id]);

  // const handleClick = async (floorId, newCapacity) => {
  //   try {
  //     if (!isNaN(newCapacity)) {
  //       // Clona el objeto de la oficina.
  //       const updatedOffice = { ...office };

  //       console.log("updatedOffice-->", updatedOffice);

  //       // Encuentra el piso que coincide con el floorId proporcionado.
  //       const targetFloor = updatedOffice.floors.find(
  //         (floor) => floor.id === floorId
  //       );

  //       console.log("targetFloor-->", targetFloor);

  //       if (targetFloor) {
  //         // Actualiza la capacidad de la primera mesa en el piso.
  //         targetFloor.tables[0].capacity = parseInt(newCapacity);
  //       }

  //       // Usa la ruta para actualizar la capacidad de la mesa en el backend.
  //       await axiosInstance.put(
  //         `/admin/offices/${id}/tables/${targetFloor.tables[0].id}`,
  //         { capacity: newCapacity }
  //       );

  //       // Actualiza el estado local con el objeto de la oficina modificado.
  //       setOffice(updatedOffice);

  //       // Actualiza inputValues.
  //       setInputValues({ ...inputValues, [floorId]: newCapacity });
  //     } else {
  //       console.error("El valor ingresado no es un número válido.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Función para cambiar la visualización al hacer clic en el botón.
  // const toggleShowCapacity = () => {
  //   setShowCapacity(!showCapacity);
  // };

  const formik = useFormik({
    initialValues: {
      name: "",
      floor: "",
      capacity: "",
    },
  });

  const handleDeleteTable = async (tableId) => {
    try {
      const deletedTable = await axiosInstance.delete(
        `/admin/offices/${id}/tables/${tableId}`
      );
      toast.success("Mesa eliminada correctamente", { className: "alerts" });
      setOfficesTables(officesTables.filter((table) => table.id !== tableId));
    } catch (error) {
      toast.error(error.response.data, { className: "alerts" });
    }
  };

  const handleTableSubmit = async () => {
    try {
      const { floor, name, capacity } = formik.values;

      const response = await axiosInstance.post(
        `/admin/offices/${office.id}/tables`,
        { floor, name, capacity }
      );

      console.log("response--->", response);
      toast.success("Mesa creada correctamente", { className: "alerts" });

      setOfficesTables([...officesTables, response.data]);

      formik.setValues({
        floor: "",
        name: "",
        capacity: "",
      });
    } catch (error) {
      toast.error(error.response.data, { className: "alerts" });
    }
  };

  return office.status === "enabled" ? (
    <div style={{ marginTop: "2%" }}>
      <Text size={"8"} align="center" as="div">
        Mesas disponibles
      </Text>
      <Table.Root style={{ marginTop: "2%" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Piso</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Capacidad</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {officesTables?.map((table) => {
            // const capacityValue = inputValues[table.id]

            return (
              <Table.Row key={table.id}>
                <Table.RowHeaderCell>{table.name}</Table.RowHeaderCell>
                <Table.Cell>{table.floor}</Table.Cell>
                <Table.Cell>
                  {table.capacity}
                  {/* {showCapacity ? (
                    capacityValue
                  ) : (
                    <input
                      value={capacityValue.toString()}
                      type="number"
                      style={{ width: "50%" }}
                      onChange={(e) =>
                        setInputValues({
                          ...inputValues,
                          [table.id]: parseInt(e.target.value),
                        })
                      }
                    />
                  )} */}
                </Table.Cell>
                <Table.Cell>
                  {user.role === "admin" ? (
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <Button
                          color="crimson"
                          variant="soft"
                          // onClick={() => handleClick(table.id, capacityValue)}
                        >
                          Eliminar
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content style={{ maxWidth: "80%" }}>
                        <AlertDialog.Title> Eliminar Mesa</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          ¿Estas seguro que deseas eliminar esta mesa?
                        </AlertDialog.Description>

                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancelar
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button
                              color="crimson"
                              variant="soft"
                              onClick={() => handleDeleteTable(table.id)}
                            >
                              Eliminar
                            </Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  ) : (
                    ""
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
          {user.role === "admin" ? (
            <Table.Row>
              <Table.RowHeaderCell>
                <input
                  name="name"
                  value={formik.values.name}
                  className="Input"
                  type="text"
                  style={{ width: "100%" }}
                  onChange={formik.handleChange}
                />
              </Table.RowHeaderCell>
              <Table.Cell>
                <input
                  name="floor"
                  value={formik.values.floor}
                  type="number"
                  className="Input"
                  style={{ width: "70%" }}
                  onChange={formik.handleChange}
                />
              </Table.Cell>
              <Table.Cell>
                <input
                  name="capacity"
                  value={formik.values.capacity}
                  type="number"
                  className="Input"
                  style={{ width: "50%" }}
                  onChange={formik.handleChange}
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  color="cyan"
                  variant="soft"
                  onClick={() => handleTableSubmit()}
                >
                  Crear
                </Button>
              </Table.Cell>
            </Table.Row>
          ) : null}
        </Table.Body>
      </Table.Root>
      {/* {user.role === "admin" ? (
        <Button onClick={toggleShowCapacity} style={{ marginTop: "20px" }}>
          Mostrar Capacidad
        </Button>
      ) : (
        ""
      )} */}
    </div>
  ) : (
    <Text size={"8"} align="center" as="div">
      Mesas inhabilitadas
    </Text>
  );
}
