"use client";

import React, { useState, useEffect } from "react";
import { Card, Flex, Box, Text, Button, AlertDialog } from "@radix-ui/themes";
import Link from "next/link";
import { useSelector } from "react-redux";
import { descriptionBookings, reservationDateSetter } from "@/utils/changeDateFormat";
import axiosInstance from "axiosConfig";
import { fetchUser } from "@/utils/fetchUser";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function Bookings() {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state.user.value);
  const [activeBookings, setActiveBookings] = useState(true);
  const [history, setHistory] = useState(false);
  const [canceledBookings, setCanceledBookings] = useState(false);
  const [officeData, setOfficeData] = useState({});

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/booking/${user.userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user.userId]);

  useEffect(() => {
    if (bookings.length > 0) {
      bookings.forEach((booking) => fetchOfficeData(booking));
    }
  }, [bookings]);

  const fetchOfficeData = async (booking) => {
    try {
      const response = await axiosInstance.get(
        `/admin/offices/${booking.table.officeId}`
      );
      setOfficeData((prevData) => ({
        ...prevData,
        [booking.id]: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const response = await axiosInstance.put(`/booking/${bookingId}`, {
        status: "canceled",
      });
      setBookings((prevBookings) => {
        const updatedBookings = prevBookings.map((booking) => {
          if (booking.id === bookingId) {
            return { ...booking, status: response.data.status };
          }
          return booking;
        });
        return updatedBookings;
      });
      toast.success("Reserva cancelada", { className: "alerts" });
    } catch (error) {
      toast.error(error.response.data, { className: "alerts" });
    }
  };

  const handleActiveBookingsClick = () => {
    setActiveBookings(true);
    setHistory(false);
    setCanceledBookings(false);
  };

  const handleHistoryClick = () => {
    setActiveBookings(false);
    setHistory(true);
    setCanceledBookings(false);
  };

  const handleCanceledBookingsClick = () => {
    setActiveBookings(false);
    setHistory(false);
    setCanceledBookings(true);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Link href="offices/1/new-booking">
          <Button color="indigo" variant="soft">
            Nueva reserva
          </Button>
        </Link>
      </div>
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
          onClick={handleActiveBookingsClick}
          style={{
            fontWeight: activeBookings ? "bold" : "normal",
            borderBottom: activeBookings ? "4px solid #001f55" : "none",
            display: "flex",
            alignItems: "center",
            margin: "0px 5px",
          }}
        >
          <Text
            size="4"
            style={{
              marginRight: "20px",
              color: "#001f55",
              margin: "0 auto",
              fontSize: "15px",
            }}
          >
            Reservas Activas
          </Text>
        </button>
        <button
          onClick={handleHistoryClick}
          style={{
            fontWeight: history ? "bold" : "normal",
            borderBottom: history ? "4px solid #001f55" : "none",
            display: "flex",
            alignItems: "center",
            margin: "0px 5px",
          }}
        >
          <Text
            size="4"
            style={{
              marginRight: "20px",
              color: "#001f55",
              margin: "0 auto",
              fontSize: "15px",
            }}
          >
            Historial
          </Text>
        </button>
        <button
          onClick={handleCanceledBookingsClick}
          style={{
            fontWeight: canceledBookings ? "bold" : "normal",
            borderBottom: canceledBookings ? "4px solid #001f55" : "none",
            display: "flex",
            alignItems: "center",
            margin: "0px 5px",
          }}
        >
          <Text
            size="4"
            style={{
              marginRight: "20px",
              color: "#001f55",
              margin: "0 auto",
              fontSize: "15px",
            }}
          >
            Reservas Canceladas
          </Text>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {activeBookings &&
          (bookings.filter((booking) => booking.status === "active").length ===
          0 ? (
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                No tienes reservas activas en este momento.
              </p>
            </div>
          ) : (
            bookings
              .filter((booking) => booking.status === "active")
              .map((booking) => (
                <div key={booking.id} style={{ marginBottom: "20px" }}>
                  <Card
                    size="3"
                    style={{
                      maxWidth: 400,
                      maxWidth: "380px",
                      maxHeight: "210px",
                      minWidth: "380px",
                      minHeight: "210px",
                      margin: "10px",
                    }}
                  >
                    <Flex align="center" gap={4}>
                      <img
                        src={officeData[booking.id]?.urlImg[0] || ""}
                        alt="Icon"
                        height="120px"
                        width="120px"
                      />
                      <Box style={{ marginLeft: "10px" }}>
                        <Text size="5">{`N° de Servicio #${booking.id}`}</Text>
                        <Text as="div" color="gray" mb="1" size="2">
                          {`Fecha: ${descriptionBookings(booking.day)}`}
                        </Text>
                        <Text as="div" color="gray" mb="1" size="2">
                          {`Lugar: ${officeData[booking.id]?.name || ""}`}
                        </Text>
                        <Text as="div" color="gray" mb="1" size="2">
                          {`Turno: ${booking.shift}`}
                        </Text>

                        <AlertDialog.Root>
                          <AlertDialog.Trigger>
                            <Button color="red" style={{ marginTop: "10px" }}>
                              Eliminar Reserva
                            </Button>
                          </AlertDialog.Trigger>
                          <AlertDialog.Content style={{ maxWidth: "80%" }}>
                            <AlertDialog.Title>
                              {" "}
                              Eliminar Reserva
                            </AlertDialog.Title>
                            <AlertDialog.Description size="2">
                              ¿Estás seguro que deseas cancelar esta reserva?
                            </AlertDialog.Description>
                            <Flex gap="3" mt="4" justify="end">
                              <AlertDialog.Cancel>
                                <Button variant="soft" color="gray">
                                  Cancelar
                                </Button>
                              </AlertDialog.Cancel>
                              <AlertDialog.Action>
                                <Button
                                  variant="solid"
                                  color="red"
                                  onClick={() => cancelBooking(booking.id)}
                                >
                                  Eliminar
                                </Button>
                              </AlertDialog.Action>
                            </Flex>
                          </AlertDialog.Content>
                        </AlertDialog.Root>
                      </Box>
                    </Flex>
                  </Card>
                </div>
              ))
          ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {history &&
          (bookings.filter((booking) => booking.status === "completed")
            .length === 0 ? (
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                No tienes reservas completadas en este momento.
              </p>
            </div>
          ) : (
            bookings
              .filter((booking) => booking.status === "completed")
              .map((booking) => (
                <div key={booking.id} style={{ marginBottom: "20px" }}>
                  <Card
                    size="3"
                    style={{
                      maxWidth: 400,
                      maxWidth: "380px",
                      maxHeight: "210px",
                      minWidth: "380px",
                      minHeight: "210px",
                      margin: "10px",
                    }}
                  >
                    <Flex align="center" gap={4}>
                      <img
                        src={officeData[booking.id]?.urlImg[0] || ""}
                        alt="Icon"
                        height="120px"
                        width="120px"
                      />
                      <Box style={{ marginLeft: "10px" }}>
                        <Text size="5">{`N° de Servicio #${booking.id}`}</Text>
                        <Text as="div" color="gray" mb="1" size="2">
                          {`Fecha: ${descriptionBookings(booking.day)}`}
                        </Text>
                        <Text as="div" color="gray" mb="1" size="2">
                          {`Lugar: ${officeData[booking.id]?.name || ""}`}{" "}
                        </Text>
                        <Text as="div" color="gray" mb="1" size="2">
                          {`Turno: ${booking.shift}`}
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </div>
              ))
          ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {canceledBookings &&
          (bookings.filter((booking) => booking.status === "canceled")
            .length === 0 ? (
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                No tienes reservas canceladas.
              </p>
            </div>
          ) : (
            bookings
              .filter((booking) => booking.status === "canceled")
              .map((booking) => (
                <div key={booking.id} style={{ marginBottom: "20px" }}>
                  <Card
                    size="3"
                    style={{
                      maxWidth: 400,
                      maxWidth: "380px",
                      maxHeight: "210px",
                      minWidth: "380px",
                      minHeight: "210px",
                      margin: "10px",
                    }}
                  >
                    <Flex align="center" gap={4}>
                      <img
                        src={officeData[booking.id]?.urlImg[0] || ""}
                        alt="Icon"
                        height="120px"
                        width="120px"
                      />
                      <Box style={{ marginLeft: "10px" }}>
                        <Text size="5">{`N° de Servicio #${booking.id}`}</Text>
                        <Text as="div" color="gray" mb="1" size="2">
                          {`Fecha: ${descriptionBookings(booking.day)}`}
                        </Text>
                        <Text as="div" color="gray" mb="1" size="2">
                          {`Lugar: ${officeData[booking.id]?.name || ""}`}{" "}
                        </Text>
                        <Text as="div" color="gray" mb="1" size="2">
                          {`Turno: ${booking.shift}`}
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </div>
              ))
          ))}
      </div>
    </div>
  );
}
