"use client";

import { Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/hooks/fetchUser";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axiosInstance.get("/staff/users");
        setUsers(users.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="userList">
      <Text size={"8"} align="center" as="div">
        Lista de Usuarios
      </Text>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Rol</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Ver</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users?.map((user) => {
            return (
              <Table.Row key={user.id} className={user.status}>
                <Table.RowHeaderCell>{user.id}</Table.RowHeaderCell>
                <Table.Cell>
                  {user.name} {user.lastName}
                </Table.Cell>
                <Table.Cell>{user.role.name}</Table.Cell>
                <Table.Cell>{user.status}</Table.Cell>

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