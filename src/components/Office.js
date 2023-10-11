"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/utils/fetchUser";
import OfficeCard from "@/components/OfficeCard";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import TablesList from "./TablesList";

export default function User({ id }) {
  const [office, setOffice] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const [bookings, setBookings] = useState({});

  const user = useSelector((state) => state.user.value);

  let message = "¿Estas seguro que deseas deshabilitar esta oficina?";

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

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

  for (let i = 0; i < bookings.length; i++) {
    if (
      bookings[i].table.officeId === parseInt(id) &&
      bookings[i].status === "active"
    ) {
      message =
        "ADVERTENCIA: Existen reservas activas hechas en esta oficina. ¿Estas seguro que deseas deshabilitar esta oficina?";
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/booking`);
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = async () => {
    try {
      const newStatus = office.status === "enabled" ? "disabled" : "enabled";

      const updatedOffice = await axiosInstance.put(`/admin/offices/${id}`, {
        status: newStatus,
      });

      setOffice(updatedOffice.data);

      if (newStatus === "disabled") {

        for (let i = 0; i < bookings.length; i++) {
          const booking = bookings[i];
          if (
            booking.table.officeId === parseInt(id) &&
            booking.status === "active"
          ) {
            await axiosInstance.delete(`/booking/${booking.id}`);
          }
        }

        const response = await axiosInstance.get(`/booking`);
        setBookings(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <OfficeCard user={user} office={office} />
      <TablesList id={id} status={office.status}/>
      {user.role === "admin" ? (
        office.status === "enabled" ? (
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color="red" style={{ marginTop: "20px" }}>
                Deshabilitar Oficina
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: "80%" }}>
              <AlertDialog.Title> Deshabilitar Oficina</AlertDialog.Title>
              <AlertDialog.Description size="2">
                {message}
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancelar
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button color="red" onClick={toggleStatus}>
                    Deshabilitar Oficina
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        ) : (
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color="grass" style={{ marginTop: "20px" }}>
                Habilitar Oficina
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: "80%" }}>
              <AlertDialog.Title> Habilitar Oficina</AlertDialog.Title>
              <AlertDialog.Description size="2">
                ¿Estas seguro que deseas habilitar esta oficina?
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancelar
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button color="red" onClick={toggleStatus}>
                    Habilitar Oficina
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        )
      ) : (
        ""
      )}
    </div>
  );
}
