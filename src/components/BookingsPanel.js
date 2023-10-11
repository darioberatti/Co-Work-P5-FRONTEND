"use client";

import axiosInstance from "axiosConfig";
import React, { useState, useEffect } from "react";
import { Button, Table, Text, TextField } from "@radix-ui/themes";
import { descriptionBookings, birthSetter, reservationDateSetter } from "@/utils/changeDateFormat";
import Link from "next/link";

import { Bar } from "react-chartjs-2";
import { LinearScale, Title } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function BookingsPanle({ id }) {
  const [bookings, setBookings] = useState([]);
  const [office, setOffice] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("active");

  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [bookingsByDate, setBookingsByDate] = useState([]);

  // Traer todas las reservas realizadas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/booking`);
        const officeBookings = response.data.filter(
          (res) => res.table.officeId === parseInt(id)
        );

        officeBookings.sort((a, b) => new Date(a.day) - new Date(b.day));
        setBookings(officeBookings);
        setBookingsByDate(officeBookings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Traer la oficina segun id del params
  useEffect(() => {
    const fetchData = async () => {
      try {
        const officeResponse = await axiosInstance.get(`/admin/offices/${id}`);
        setOffice(officeResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  // Traer todos los usuarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axiosInstance.get("/staff/users");
        setUsers(users.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const findUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? `${user.name} ${user.lastName}` : "Usuario no encontrado";
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleResetFilter = () => {
    setBookingsByDate(bookings);
    setFilterFromDate("");
    setFilterToDate("");
  };

  const handleFilterByDate = () => {
    const filteredBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.day);
      // console.log("bookingDate ---> ", bookingDate);
      return (
        bookingDate >= new Date(filterFromDate + " 01:00:00") &&
        bookingDate <= new Date(filterToDate + " 23:00:00")
      );
    });

    filteredBookings.sort((a, b) => {
      return new Date(a.day) - new Date(b.day);
    });
    setBookingsByDate(filteredBookings);
  };


  const generateOccupancyChart = () => {
    if (office.tables) {
      const uniqueDates = Array.from(
        new Set(bookingsByDate.map((booking) => booking.day.slice(0,10)))
      );

      const occupancyData = uniqueDates.map((date) => {
        const bookings = bookingsByDate.filter(
          (booking) => booking.day.slice(0,10) === date
        );
        const totalOccupancy = bookings.length;


        return totalOccupancy > 0 ? totalOccupancy : 0;
      });

      const data = {
        labels: uniqueDates,
        datasets: [
          {
            label: "Ocupación",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            data: occupancyData,
          },
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true, // Comienza en 0
            stepSize: 1, // Tamaño del paso (en este caso, 1)
            precision: 0, // Sin decimales en las etiquetas
            responsive: true,
            maintainAspectRatio: false,
            ticks: {
              min: 0,
              max: 10,
              stepSize: 1,
            },
          },
        },
      };

      return <Line data={data} options={options} />;
    } else {
      return null;
    }
  };

  

  return (
    <>
      <div className="userList">
        <Text
          size={"5"}
          align="center"
          as="div"
          style={{ padding: "20px", fontWeight: "bold" }}
        >
          {office.name}
        </Text>

        <div>
          <Text size="3" style={{ padding: "0 20px", marginBottom: "5px" }}>
            Filtrar por fecha:
          </Text>
          <div
            style={{
              display: "block",
              alignItems: "center",
              padding: "0px 20px",
            }}
          >
            <TextField.Root style={{ maxWidth: "200px", margin: "5px auto" }}>
              <TextField.Slot>Desde:</TextField.Slot>
              <TextField.Input
                type="date"
                value={filterFromDate}
                onChange={(e) => setFilterFromDate(e.target.value)}
              />
            </TextField.Root>
            <TextField.Root style={{ maxWidth: "200px", margin: "5px auto" }}>
              <TextField.Slot>Hasta:</TextField.Slot>
              <TextField.Input
                type="date"
                value={filterToDate}
                onChange={(e) => setFilterToDate(e.target.value)}
              />
            </TextField.Root>
            <Button
              color="indigo"
              style={{ margin: "10px" }}
              onClick={() => handleFilterByDate()}
            >
              Filtrar
            </Button>
            <Button
              color="crimson"
              style={{ margin: "10px" }}
              onClick={() => handleResetFilter()}
            >
              Mostrar Todo
            </Button>
          </div>
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
            onClick={() => handleStatusChange("active")}
            style={{
              fontWeight: selectedStatus === "active" ? "bold" : "normal",
              borderBottom:
                selectedStatus === "active" ? "4px solid #001f55" : "none",
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
              Activas
            </Text>
          </button>
          <button
            onClick={() => handleStatusChange("completed")}
            style={{
              fontWeight: selectedStatus === "completed" ? "bold" : "normal",
              borderBottom:
                selectedStatus === "completed" ? "4px solid #001f55" : "none",
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
              Completadas
            </Text>
          </button>
          <button
            onClick={() => handleStatusChange("canceled")}
            style={{
              fontWeight: selectedStatus === "canceled" ? "bold" : "normal",
              borderBottom:
                selectedStatus === "canceled" ? "4px solid #001f55" : "none",
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
              Canceladas
            </Text>
          </button>
        </div>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Usuario</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Fecha</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Turno</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Mesa</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {bookingsByDate
              .filter((booking) => booking.status === selectedStatus)
              .map((booking) => (
                <Table.Row key={booking.id}>
                  <Table.Cell>{findUserName(booking.userId)}</Table.Cell>
                  <Table.Cell>{reservationDateSetter(booking.day)}</Table.Cell>
                  <Table.Cell>{booking.shift}</Table.Cell>
                  <Table.Cell>{booking.table.name}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>

        <div style={{ margin: "20px 0" }}>{generateOccupancyChart()}</div>

        <div
          style={{
            margin: "10px 0",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Link href={"/offices"}>
            <Button color="green" variant="soft">
              Volver a Oficinas
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
