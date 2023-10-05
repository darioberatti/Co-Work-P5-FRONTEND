"use client";

import { Button, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/utils/fetchUser";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axiosInstance.get("/staff/users");
        users["data"].sort((a, b) => {
          const statusOrder = { enabled: 1, pending: 2, disabled: 3 };

          // Primero, compara por status
          const statusComparison = statusOrder[a.status] - statusOrder[b.status];
        
          // Si los estados son iguales, entonces compara por id
          if (statusComparison === 0) {
            return a.id - b.id;
          }
        
          return statusComparison;
        });
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
      <Button color="indigo" variant="soft" style={{ margin: "3%" }}>
        <Link href={"/staff/register"} style={{ textDecoration: "none" }}>
          Crear nuevo usuario
        </Link>
      </Button>
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
            let role = "";

            if (user.role.name === "admin") {
              role = "Admin";
            } else if (user.role.name === "staff") {
              role = "Staff";
            } else {
              role = "Alumno";
            }

            let status = "";

            if (user.status === "pending") {
              status = "Pendiente";
            } else if (user.status === "enabled") {
              status = "Activo";
            } else {
              status = "Deshabilitado";
            }
            return (
              <Table.Row key={user.id} className={user.status}>
                <Table.RowHeaderCell>{user.id}</Table.RowHeaderCell>
                <Table.Cell>
                  {user.name} {user.lastName}
                </Table.Cell>
                <Table.Cell>{role}</Table.Cell>
                <Table.Cell>{status}</Table.Cell>

                <Table.Cell>
                  <Link
                    href={`/staff/users/${user.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    +
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
