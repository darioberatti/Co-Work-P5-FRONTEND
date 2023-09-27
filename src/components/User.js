"use client";

import { Button, Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";

export default function User({ id }) {
  const logedUser = useSelector((state) => state.user.value);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axios.get(`http://localhost:3001/staff/users/${id}`);
        setUser(user.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDisableUser = async () => {
    try {
      if (confirm("¿Estas seguro que deseas deshabilitar este usuario?")) {
        const disableUser = await axiosInstance.put(`/staff/users/${id}`, {
          status: "disabled",
        });
        alert("Usuario deshabilitado");
        window.location.reload();
      }
    } catch (error) {
      console.error();
      error;
    }
  };

  const handleEditRole = async () => {
    try {
      if (logedUser.roleId >= user.roleId)
        return alert("No tiene permisos para realizar la acción");
      if (confirm("¿Estas seguro que desea cambiar el rol de este usuario?")) {
        const editedUser = await axiosInstance.put(`/staff/users/${id}`, {
          roleId: user.roleId - 1,
        });
        alert("Usuario actualizado");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(logedUser);

  return (
    <Card>
      <Flex direction={"column"}>
        <Text size={"7"}>
          {user.name} {user.lastName}
        </Text>
        <Text size={"4"}>{user.email}</Text>
        <Text size={"4"}>DNI: {user.DNI}</Text>
        <Text size={"4"}>Edad: {user.age}</Text>
        <Text size={"4"}>Curso: {user.course}</Text>
        <hr></hr>
        <Flex justify={"between"}>
          <Text size={"4"}>Rol: {user.roleId}</Text>{" "}
          <Button
            color="orange"
            variant="soft"
            onClick={() => handleEditRole()}
          >
            Subir rol
          </Button>
        </Flex>
        <Text size={"4"}>Estado: {user.status}</Text>
        <br></br>
        <Button
          color="crimson"
          variant="soft"
          onClick={() => handleDisableUser()}
        >
          Deshabilitar usuario
        </Button>
      </Flex>
    </Card>
  );
}
