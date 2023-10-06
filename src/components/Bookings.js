"use client";

import React, { useState, useEffect } from "react";
import { Card, Flex, Box, Text, Button } from "@radix-ui/themes";
import Link from "next/link";
import { useSelector } from "react-redux";
import { descriptionBookings } from "@/utils/changeDateFormat";
import axiosInstance from "axiosConfig";
import { fetchUser } from "@/utils/fetchUser";
import { useDispatch } from "react-redux";

export default function Bookings() {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state.user.value);
  const [activeReserves, setActiveReserves] = useState(true);
  const [history, setHistory] = useState(false);
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

  useEffect(() => {
    bookings
      .filter((booking) => booking.status === "active")
      .forEach((booking) => fetchOfficeData(booking));
  }, [bookings]);

  console.log(user);
  console.log(bookings);
  console.log(officeData);

  const deleteBooking = async (bookingId) => {
    if (confirm("¿Estás seguro que deseas eliminar esta reserva?")) {
      try {
        await axiosInstance.delete(`/booking/${bookingId}`);
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== bookingId)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleActiveReservesClick = () => {
    setActiveReserves(true);
    setHistory(false);
  };

  const handleHistoryClick = () => {
    setActiveReserves(false);
    setHistory(true);
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
        <button
          onClick={handleActiveReservesClick}
          style={{
            fontWeight: activeReserves ? "bold" : "normal",
            borderBottom: activeReserves ? "4px solid #001f55" : "none",
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
            Historial
          </Text>
        </button>
        <Link href="offices/1/new-booking">
          {" "}
          <Button color="indigo" variant="soft">
            Nueva reserva
          </Button>
        </Link>
      </div>
      {activeReserves &&
        bookings
          .filter((booking) => booking.status === "active")
          .map((booking) => (
            <div key={booking.id} style={{ marginBottom: "20px" }}>
              <Card size="3" style={{ maxWidth: 400 }}>
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
                    <Button
                      color="red"
                      onClick={() => deleteBooking(booking.id)}
                      style={{ marginTop: "10px" }}
                    >
                      Eliminar Reserva
                    </Button>
                  </Box>
                </Flex>
              </Card>
            </div>
          ))}
      {history &&
        bookings
          .filter((booking) => booking.status === "completed")
          .map((booking) => (
            <div key={booking.id} style={{ marginBottom: "20px" }}>
              <Card size="3" style={{ maxWidth: 400 }}>
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
          ))}
    </div>
  );
}