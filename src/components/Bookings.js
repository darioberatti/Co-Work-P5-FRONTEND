"use client";

import React, { useState } from "react";
import { Card, Flex, Box, Text, Button } from "@radix-ui/themes";
import Link from "next/link";
import { generateBookings } from "@/utils/fakeBookings";
import { descriptionBookings } from "@/utils/changeDateFormat";

export default function Bookings() {
  const bookings = generateBookings();

  const [activeReserves, setActiveReserves] = useState(true);
  const [history, setHistory] = useState(false);

  const handleActiveReservesClick = () => {
    setActiveReserves(true);
    setHistory(false);
  };

  const handleHistoryClick = () => {
    setActiveReserves(false);
    setHistory(true);
  };

  return (
    <div
      style={{
        fontFamily: "monserrat, sans-serif",
        fontWeight: "400",
      }}
    >
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
        <Button color="indigo" variant="soft">
          Nueva reserva
        </Button>
      </div>
      {activeReserves &&
        bookings
          .filter((booking) => booking.status === "active")
          .map((booking) => (
            <div key={booking.id} style={{ marginBottom: "20px" }}>
              <Card size="3" style={{ maxWidth: 400 }}>
                <Flex align="center" gap={4}>
                  <img
                    src={booking.urlImg}
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
                      {`Lugar: ${booking.office}`}
                    </Text>
                    <Text as="div" color="gray" mb="1" size="2">
                      {`Turno: ${booking.shift}`}
                    </Text>

                    <Button color="indigo" variant="soft">
                      Volver a reservar aquí
                    </Button>
                  </Box>
                </Flex>
              </Card>
            </div>
          ))}
      {history &&
        bookings
          .filter((booking) => booking.status === "complete")
          .map((booking) => (
            <div key={booking.id} style={{ marginBottom: "20px" }}>
              <Card size="3" style={{ maxWidth: 400 }}>
                <Flex align="center" gap={4}>
                  <img
                    src={booking.urlImg}
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
                      {`Lugar: ${booking.office}`}
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
