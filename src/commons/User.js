"use client";

import { AlertDialog, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/utils/fetchUser";
import { birthSetter } from "@/utils/changeDateFormat";
import { toast } from "sonner";
import Chart from "chart.js/auto"; // No borrar, se usa para el gráfico
import { Doughnut } from "react-chartjs-2";
import Link from "next/link";
import EditUser from "@/components/EditUser";

export default function User({ id }) {
  const logedUser = useSelector((state) => state.user.value);
  const [user, setUser] = useState({});
  const [statistics, setStatistics] = useState(false); //Acvtiva o desactiva la visualización de estadísticas
  const [bookings, setBookings] = useState([]);
  const [editUser, setEditUser] = useState(false);

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

  useEffect(() => {
    //Trae las reservas el usuario si el id está definido
    if (user.id) {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/booking/${user.id}`);
          setBookings(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [user.id]);

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

  const handleEditUser = () => {
    editUser ? setEditUser(false) : setEditUser(true);
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

  //Estado de las reservas
  let active = bookings.filter((booking) => booking.status === "active").length;
  let completed = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;
  let canceled = bookings.filter(
    (booking) => booking.status === "canceled"
  ).length;
  let totalBookings = active + completed + canceled;

  const doughnutData = {
    //Data del gráfico
    labels: ["Activas", "Completadas", "Canceladas"],
    datasets: [
      {
        label: "Reservas",
        data: [active, completed, canceled],
        backgroundColor: [
          "rgb(255, 205, 86)",
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
        ],
      },
    ],
  };

  //Ver o dejar de ver estadísticas
  const handleStatistics = () => {
    if (statistics) {
      setStatistics(false);
    } else {
      setStatistics(true);
    }
  };

  return (
    <>
      {editUser ? (
        <EditUser></EditUser>
      ) : (
        <Flex direction={"column"} className="userData">
          <Flex justify={"between"} className="userDataText">
            <Text size={"8"}>
              {user.name} {user.lastName}
            </Text>
            <Button
              color="orange"
              variant="soft"
              onClick={() => handleEditUser()}
            >
              Editar Usuario
            </Button>
          </Flex>
          <Card className="userCard">
            <Flex direction={"column"}>
              <Text size={"4"} className="userDataText">
                {user.email}
              </Text>
              <Text size={"4"} className="userDataText">
                ID de usuario: {user.id}
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
              <Flex
                justify={"between"}
                direction={"column"}
                className="userDataText"
              >
                {user.role ? (
                  <Text size={"4"} className="userDataText">
                    Rol: {role}
                  </Text>
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
                        {user.role.name && user.role.name === "staff"
                          ? "Cambiar a Alumno"
                          : "Cambiar a Staff"}
                      </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content style={{ maxWidth: "80%" }}>
                      <AlertDialog.Title>Cambiar Rol</AlertDialog.Title>
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
                            {user.role.name && user.role.name === "staff"
                              ? "Cambiar a Alumno"
                              : "Cambiar a Staff"}
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
                user.role.name !== "admin" &&
                logedUser.userId !== user.id ? (
                  <AlertDialog.Root>
                    <AlertDialog.Trigger style={{ marginTop: "5%" }}>
                      <Button color="orange" variant="soft">
                        {user.role.name && user.role.name === "staff"
                          ? "Cambiar a Admin"
                          : "Cambiar a Staff"}
                      </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content style={{ maxWidth: "80%" }}>
                      <AlertDialog.Title>Cambiar Rol</AlertDialog.Title>
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
                            {user.role.name && user.role.name === "staff"
                              ? "Cambiar a Admin"
                              : "Cambiar a Staff"}
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
                    <Button
                      color="crimson"
                      variant="soft"
                      className="userButton"
                    >
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
              <Button
                style={{ marginTop: "10px" }}
                color="cyan"
                variant="soft"
                onClick={() => handleStatistics()}
              >
                {statistics ? "Dejar de ver estadísticas" : "Ver estadísticas"}
              </Button>
              {statistics ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "50vh",
                    marginTop: "40px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    Total de reservas realizadas: {totalBookings}
                  </div>
                  {totalBookings === 0 ? (
                    <h3>El usuario aún no tiene reservas</h3>
                  ) : (
                    <Doughnut
                      data={doughnutData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  )}
                </div>
              ) : null}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Link href={"/staff/users"}>
                  <Button color="green" variant="soft">
                    Volver a Usuarios
                  </Button>
                </Link>
              </div>
            </Flex>
          </Card>
        </Flex>
      )}
    </>
  );
}
