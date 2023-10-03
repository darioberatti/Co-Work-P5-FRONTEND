"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/utils/fetchUser";
import OfficeCard from "@/components/OfficeCard";
import SetterValues from "@/components/SetterValues";
import { Button } from "@radix-ui/themes";
import { useSelector } from "react-redux";

export default function User({ id }) {
  const [office, setOffice] = useState({});
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

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

  const toggleStatus = async () => {
    if (
      confirm("¿Estás seguro que deseas cambiar el estado de esta oficina?")
    ) {
      try {
        const newStatus = office.status === "enabled" ? "disabled" : "enabled";

        const updatedOffice = await axiosInstance.put(`/admin/offices/${id}`, {
          status: newStatus,
        });

        setOffice(updatedOffice.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <OfficeCard office={office} />
      <SetterValues id={id} />
      {user.role === "admin" ? (
        office.status === "enabled" ? (
          <Button
            color="red"
            onClick={toggleStatus}
            style={{ marginTop: "20px" }}
          >
            Deshabilitar Oficina
          </Button>
        ) : (
          <Button
            color="grass"
            onClick={toggleStatus}
            style={{ marginTop: "20px" }}
          >
            Habilitar Oficina
          </Button>
        )
      ) : (
        ""
      )}
    </div>
  );
}
