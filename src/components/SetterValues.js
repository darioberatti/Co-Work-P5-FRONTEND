"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import { Table, Text, Button } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const SetterValues = (props) => {
  const [office, setOffice] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [showCapacity, setShowCapacity] = useState(true);
  const { id } = props;

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const officeData = await axiosInstance.get(`/admin/offices/${id}`);
        setOffice(officeData.data);

        // Cargar las capacidades desde la base de datos en inputValues
        const capacities = {};
        officeData.data.floors?.forEach((floor) => {
          capacities[floor.id] = floor.tables[0].capacity;
        });
        setInputValues(capacities);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleClick = async (floorId, newCapacity) => {
    try {
      if (!isNaN(newCapacity)) {
        // Clona el objeto de la oficina.
        const updatedOffice = { ...office };

        // Encuentra el piso que coincide con el floorId proporcionado.
        const targetFloor = updatedOffice.floors.find(
          (floor) => floor.id === floorId
        );

        if (targetFloor) {
          // Actualiza la capacidad de la primera mesa en el piso.
          targetFloor.tables[0].capacity = parseInt(newCapacity);
        }

        // Usa la ruta para actualizar la capacidad de la mesa en el backend.
        await axiosInstance.put(
          `/admin/offices/${id}/tables/${targetFloor.tables[0].id}`,
          { capacity: newCapacity }
        );

        // Actualiza el estado local con el objeto de la oficina modificado.
        setOffice(updatedOffice);

        // Actualiza inputValues.
        setInputValues({ ...inputValues, [floorId]: newCapacity });
      } else {
        console.error("El valor ingresado no es un número válido.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para cambiar la visualización al hacer clic en el botón.
  const toggleShowCapacity = () => {
    setShowCapacity(!showCapacity);
  };

  return (
    <div>
      <Text size={"8"} align="center" as="div">
        Lista de Mesas
      </Text>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Piso</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Capacidad</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {office.floors?.map((floor) => {
            const capacityValue = inputValues[floor.id] || 0;

            return (
              <Table.Row key={floor.id}>
                <Table.RowHeaderCell>{floor.number}</Table.RowHeaderCell>
                <Table.Cell>{floor.tables[0].name}</Table.Cell>
                <Table.Cell>
                  {showCapacity ? (
                    capacityValue
                  ) : (
                    <input
                      value={capacityValue.toString()}
                      type="number"
                      style={{ width: "50%" }}
                      onChange={(e) =>
                        setInputValues({
                          ...inputValues,
                          [floor.id]: parseInt(e.target.value),
                        })
                      }
                    />
                  )}
                </Table.Cell>
                <Table.Cell>
                  {user.role === "admin" ? (
                    <Button
                      color="indigo"
                      variant="soft"
                      onClick={() => handleClick(floor.id, capacityValue)}
                    >
                      Actualizar
                    </Button>
                  ) : (
                    ""
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      {user.role === "admin" ? (
        <Button onClick={toggleShowCapacity} style={{ marginTop: "20px" }}>
          Mostrar Capacidad
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
