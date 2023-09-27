"use client";

import { Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";

export default function UsersList() {
  const [users, setUsers] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axiosInstance.get("/staff/users");
        setUsers(users.data);
      } catch(error) {
        console.error(error);
      }
    };
    fetchData()
  }, []);

  return (
    <div>
      <Text size={"8"} align="center" as="div">
        Lista de Usuarios
      </Text>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            {/* <Table.ColumnHeaderCell>Rol</Table.ColumnHeaderCell> */}
            <Table.ColumnHeaderCell>Ver</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users?.map((user) => {
            return (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>
                  {user.name} {user.lastName}
                </Table.RowHeaderCell>
                <Table.Cell>{user.email}</Table.Cell>
                {/* <Table.Cell>{user.role.name}</Table.Cell> */}

                <Table.Cell>
                  <Link href={`/users/${user.id}`}>+</Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
