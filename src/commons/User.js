"use client";

import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/utils/fetchUser";
import { birthSetter } from "@/utils/utils";
import { toast } from "sonner";

export default function User({ id }) {
  const logedUser = useSelector((state) => state.user.value);
  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axiosInstance.get(`/staff/users/${id}`);
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
        toast.success("Usuario deshabilitado", { className: "alerts" });
      }
    } catch (error) {
      toast.error(error.response.data, { className: "alerts" });
    }
  };

  const handleEnableUser = async () => {
    try {
      if (confirm("¿Estas seguro que deseas habilitar este usuario?")) {
        const response = await axiosInstance.put(`/staff/users/${id}`, {
          status: "enabled",
        });
        setUser((prevUser) => ({
          ...prevUser,
          status: response.data.status,
        }));
        toast.success("Usuario habilitado", { className: "alerts" });
      }
    } catch (error) {
      toast.error(error.response.data, { className: "alerts" });
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
        toast.success("Usuario actualizado", { className: "alerts" });
      }
    } catch (error) {
      toast.error(error.response.data, { className: "alerts" });
    }
  };

  let role = "";

  if (user.role && user.role.name === "admin") {
    role = "Admin";
  } else if (user.role && user.role.name === "staff") {
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
    <Flex direction={"column"} className="userData">
      <Text size={"8"} className="userDataText">
        {user.name} {user.lastName}
      </Text>
      <Card className="userCard">
        <Flex direction={"column"}>
          <Text size={"4"} className="userDataText">
            {user.email}
          </Text>
          <Text size={"4"} className="userDataText">
            ID usuario: {user.id}
          </Text>
          <Text size={"4"} className="userDataText">
            DNI: {user.DNI}
          </Text>
          <Text size={"4"} className="userDataText">
            Fecha de nacimiento: {user.birth && birthSetter(user.birth)}
          </Text>
          <Text size={"4"} className="userDataText">
            Curso: {user.course}
          </Text>
          <Flex justify={"between"} className="userDataText">
            {user.role ? (
              <Text size={"4"} className="userDataText">
                Rol: {role}
              </Text>
            ) : (
              ""
            )}
            {user.role &&
            user.status !== "disabled" &&
            user.role.name !== "admin" ? (
              <Button
                color="orange"
                variant="soft"
                className="userDataText userButton"
                onClick={() => handleEditRole()}
              >
                Subir rol
              </Button>
            ) : (
              ""
            )}
          </Flex>
          <Text size={"4"} className="userDataText">
            Estado: {status}
          </Text>
          <br></br>

          {user.status !== "disabled" &&
          logedUser.userId !== user.id &&
          logedUser.roleId <= user.roleId ? (
            <Button
              color="crimson"
              variant="soft"
              className="userButton"
              onClick={() => handleDisableUser()}
            >
              Deshabilitar usuario
            </Button>
          ) : null}
          {user.status === "disabled" &&
          logedUser.userId !== user.id &&
          logedUser.roleId <= user.roleId ? (
            <Button
              color="cyan"
              variant="soft"
              className="userButton"
              onClick={() => handleEnableUser()}
            >
              Habilitar usuario
            </Button>
          ) : null}
        </Flex>
      </Card>
    </Flex>
  );
}
