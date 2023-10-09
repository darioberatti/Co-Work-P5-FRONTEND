"use client";

import { AlertDialog, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/utils/fetchUser";
import { birthSetter } from "@/utils/changeDateFormat";
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

  const handleStatusChange = async (action) => {
    try {
      if (action) {
        const response = await axiosInstance.put(`/staff/users/${id}`, {
          status: "disabled",
        });
        setUser((prevUser) => ({
          ...prevUser,
          status: response.data.status,
        }));
        toast.success("Usuario deshabilitado", { className: "alerts" });
      } else {
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

  const handleEditRole = async (action) => {
    try {
      if (logedUser.roleId > user.roleId)
        return alert("No tiene permisos para realizar la acción");
      var response;
      if (action) {
        response = await axiosInstance.put(`/staff/users/${id}`, {
          roleId: user.roleId - 1,
        });
      } else {
        response = await axiosInstance.put(`/staff/users/${id}`, {
          roleId: user.roleId + 1,
        });
      }
      setUser((prevUser) => ({
        ...prevUser,
        roleId: response.data.roleId,
      }));
      toast.success("Usuario actualizado", { className: "alerts" });
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
            user.role.name !== "admin" &&
            logedUser.userId !== user.id ? (
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button color="orange" variant="soft">
                    Subir Rol
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: "80%" }}>
                  <AlertDialog.Title>Subir Rol</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    ¿Estas seguro que desea cambiar el rol de este usuario?
                  </AlertDialog.Description>

                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        Cancelar
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button
                        color="orange"
                        variant="soft"
                        onClick={() => handleEditRole(1)}
                      >
                        Subir Rol
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            ) : (
              ""
            )}
            {user.role &&
            user.status !== "disabled" &&
            user.role.name !== "student" &&
            logedUser.roleId <= user.roleId &&
            logedUser.userId !== user.id ? (
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button color="orange" variant="soft">
                    Bajar Rol
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: "80%" }}>
                  <AlertDialog.Title>Bajar Rol</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    ¿Estas seguro que desea cambiar el rol de este usuario?
                  </AlertDialog.Description>

                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        Cancelar
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button
                        color="orange"
                        variant="soft"
                        onClick={() => handleEditRole(0)}
                      >
                        Bajar Rol
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            ) : (
              ""
            )}
          </Flex>
          <Text size={"4"} className="userDataText">
            Estado: {status}
          </Text>
          <br></br>

          {user.status === "enabled" &&
          logedUser.userId !== user.id &&
          logedUser.roleId <= user.roleId ? (
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button color="crimson" variant="soft" className="userButton">
                  Deshabilitar usuario
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content style={{ maxWidth: "80%" }}>
                <AlertDialog.Title> Deshabilitar usuario</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  ¿Estas seguro que deseas deshabilitar este usuario?
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancelar
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button
                      color="crimson"
                      variant="soft"
                      onClick={() => handleStatusChange(1)}
                    >
                      Deshabilitar usuario
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          ) : null}
          {user.status === "disabled" &&
          logedUser.userId !== user.id &&
          logedUser.roleId <= user.roleId ? (
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button color="cyan" variant="soft" className="userButton">
                  Habilitar usuario
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content style={{ maxWidth: "80%" }}>
                <AlertDialog.Title> Habilitar usuario</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  ¿Estas seguro que deseas habilitar este usuario?
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancelar
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button
                      color="cyan"
                      variant="soft"
                      onClick={() => handleStatusChange(0)}
                    >
                      Habilitar usuario
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          ) : null}
        </Flex>
      </Card>
    </Flex>
  );
}
