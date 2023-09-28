"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "../../axiosConfig";
import { Table, Text, Button } from "@radix-ui/themes";

export const SetterValues = (props) => {
  const [office, setOffice] = useState({});
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
  }, []);

  const handleClick = () => {
    
  }

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
            {/* <Table.ColumnHeaderCell>Rol</Table.ColumnHeaderCell> */}
            <Table.ColumnHeaderCell>Capacidad</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {office.floors?.map((floor) => {
            return (
              <Table.Row key={floor.id}>
                <Table.RowHeaderCell>{floor.number}</Table.RowHeaderCell>
                <Table.Cell>{floor.tables[0].name}</Table.Cell>
                <Table.Cell>{floor.tables[0].capacity}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            );
          })}{" "}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
