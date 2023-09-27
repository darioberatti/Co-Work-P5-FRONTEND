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
  }, [user.roleId, user.status]);

  const handleDisableUser = async () => {
    try {
      if (confirm("¿Estas seguro que deseas deshabilitar este usuario?")) {
        const response = await axiosInstance.put(`/staff/users/${id}`, {
          status: "disabled",
        });
        setUser((prevUser) => ({
          ...prevUser,
          status: response.data.status,
        }));
        alert("Usuario deshabilitado");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditRole = async () => {
    try {
      if (logedUser.roleId >= user.roleId)
        return alert("No tiene permisos para realizar la acción");
      if (confirm("¿Estas seguro que desea cambiar el rol de este usuario?")) {
        const response = await axiosInstance.put(`/staff/users/${id}`, {
          roleId: user.roleId - 1,
        });
        setUser((prevUser) => ({
          ...prevUser,
          roleId: response.data.roleId,
        }));
        alert("Usuario actualizado");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log("user estado -->", user);

  console.log(logedUser);

  return (
    <Card>
      <Flex direction={"column"}>
        <Text size={"8"} className="userDataText">
          {user.name} {user.lastName}
        </Text>
        <Text size={"4"} className="userDataText">{user.email}</Text>
        <Text size={"4"} className="userDataText">DNI: {user.DNI}</Text>
        <Text size={"4"} className="userDataText">Edad: {user.age}</Text>
        <Text size={"4"} className="userDataText">Curso: {user.course}</Text>
        <Flex justify={"between"} className="userDataText">
          {user.role ? <Text size={"4"} className="userDataText">Rol: {user.role.name}</Text> : ""}
          <Button
            color="orange"
            variant="soft"
            className="userDataText"
            onClick={() => handleEditRole()}
          >
            Subir rol
          </Button>
        </Flex>
        <Text size={"4"} className="userDataText">Estado: {user.status}</Text>
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
