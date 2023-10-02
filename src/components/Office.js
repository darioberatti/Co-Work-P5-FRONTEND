"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/utils/fetchUser";
import OfficeCard from "@/components/OfficeCard";
import { SetterValues } from "./SetterValues";
import { Button } from "@radix-ui/themes";

export default function User({ id }) {
  const [office, setOffice] = useState({});
  const dispatch = useDispatch();

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
    try {
      const newStatus = office.status === "enabled" ? "disabled" : "enabled";

      const updatedOffice = await axiosInstance.put(`/admin/offices/${id}`, {
        status: newStatus,
      });

      setOffice(updatedOffice.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(office);

  return (
    <div>
      <OfficeCard office={office} />
      <SetterValues id={id} />
      {office.status === "enabled" ? (
        <Button color="red" onClick={toggleStatus} style={{ marginTop: "20px" }}>
          Deshabilitar Oficina
        </Button>
      ) : (
        <Button color="grass" onClick={toggleStatus} style={{ marginTop: "20px" }}>
          Habilitar Oficina
        </Button>
      )}
    </div>
  );
}
