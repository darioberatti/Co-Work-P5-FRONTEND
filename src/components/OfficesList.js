"use client";

import { Table, Text } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OfficesList() {
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offices = await axios.get("http://localhost:3001/admin/offices");
        setOffices(offices.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log("offices-->", offices);

  return (
    <div>
      <Text size={"8"} align="center" as="div">
        Lista de Oficinas
      </Text>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Dirección</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Ciudad</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>País</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {offices?.map((office) => {
            return (
              <Table.Row key={office.id}>
                <Table.RowHeaderCell>{office.name}</Table.RowHeaderCell>
                <Table.Cell>{office.address}</Table.Cell>
                <Table.Cell>{office.city}</Table.Cell>
                <Table.Cell>{office.country}</Table.Cell>

                <Table.Cell>
                  <Link href={`/offices/${office.id}`}>+</Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
