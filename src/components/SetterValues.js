"use client"

import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import { Table, Text, Button } from "@radix-ui/themes";

export const SetterValues = (props) => {
  const [office, setOffice] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [showCapacity, setShowCapacity] = useState(true); // Estado para controlar la visualización
  const { id } = props;

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

        console.log("UPDATED OFFICE", updatedOffice); // Llega la información actualizada correctamente.

        // Usa la ruta para actualizar la oficina.
        await axiosInstance.put(`/admin/offices/${id}`, updatedOffice);

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
                  {showCapacity ? ( // Mostrar capacidad o input según el estado
                    capacityValue
                  ) : (
                    <input
                      value={capacityValue.toString()} // Convierte capacityValue en string.
                      type="number"
                      style={{ width: "50%" }}
                      onChange={(e) =>
                        setInputValues({
                          ...inputValues,
                          [floor.id]: parseFloat(e.target.value), // Convierte el valor ingresado a número.
                        })
                      }
                    />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="indigo"
                    variant="soft"
                    onClick={() => handleClick(floor.id, capacityValue)}
                  >
                    Actualizar
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Button onClick={toggleShowCapacity} style={{ marginTop: "20px" }}>
        Mostrar Capacidad
      </Button>
    </div>
  );
};
