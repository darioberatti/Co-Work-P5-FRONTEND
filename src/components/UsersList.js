"use client";

import { Button, Flex, Table, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/utils/fetchUser";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [showedState, setShowedState] = useState("enabled");
  const [searchInput, setSearchInput] = useState("");
  const [showingSearch, setShowingSearch] = useState(false);
  const [dependencyGetUsers, setDependencyGetUsers] = useState(0);

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
          const statusComparison =
            statusOrder[a.status] - statusOrder[b.status];

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
  }, [dependencyGetUsers]);

  const handleshowedState = (status) => {
    setShowedState(status);
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(
        `/staff/users/search/${searchInput}`
      );
      setUsers(response.data);
      setShowedState(response.data[0].status);
      setSearchInput("");
      setShowingSearch(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="userList">
        <Text size={"8"} align="center" as="div">
          Lista de Usuarios
        </Text>
        <Button color="indigo" variant="soft" style={{ margin: "3%" }}>
          <Link href={"/staff/register"} style={{ textDecoration: "none" }}>
            Crear nuevo usuario
          </Link>
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={() => handleshowedState("enabled")}
            style={{
              fontWeight: showedState === "enabled" ? "bold" : "normal",
              borderBottom:
                showedState === "enabled" ? "4px solid #001f55" : "none",
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <Text
              size="4"
              style={{
                marginRight: "20px",
                color: "#001f55",
                margin: "0 auto",
              }}
            >
              Activos
            </Text>
          </button>
          <button
            onClick={() => handleshowedState("pending")}
            style={{
              fontWeight: showedState === "pending" ? "bold" : "normal",
              borderBottom:
                showedState === "pending" ? "4px solid #001f55" : "none",
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <Text
              size="4"
              style={{
                marginRight: "20px",
                color: "#001f55",
                margin: "0 auto",
              }}
            >
              Pendientes
            </Text>
          </button>
          <button
            onClick={() => handleshowedState("disabled")}
            style={{
              fontWeight: showedState === "disabled" ? "bold" : "normal",
              borderBottom:
                showedState === "disabled" ? "4px solid #001f55" : "none",
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <Text
              size="4"
              style={{
                marginRight: "20px",
                color: "#001f55",
                margin: "0 auto",
              }}
            >
              Deshabilitados
            </Text>
          </button>
        </div>
        <TextField.Root style={{ marginTop: "4%" }}>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            placeholder="Busca por nombre o email"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <Button
            variant="classic"
            highContrast
            onClick={() => {
              handleSearch();
            }}
          >
            Buscar
          </Button>
        </TextField.Root>

        {showingSearch ? (
          <Flex justify={"between"} style={{ marginTop: "5%" }}>
            <Text size={"5"} align="center" as="div">
              Resultados de búsqueda
            </Text>
            <Button
              variant="classic"
              onClick={() => {
                setShowingSearch(false);
                setDependencyGetUsers(dependencyGetUsers + 1);
              }}
            >
              Ver todos
            </Button>
          </Flex>
        ) : null}

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
            {users
              ?.filter((user) => user.status === showedState)
              .map((user) => {
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
            {users?.filter((user) => user.status === showedState).length ===
            0 ? (
              <Table.Row style={{ textAlign: "center" }}>
                <Table.RowHeaderCell>-</Table.RowHeaderCell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>

                <Table.Cell>-</Table.Cell>
              </Table.Row>
            ) : null}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  );
}
