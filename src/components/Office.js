"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import OfficeCard from "@/commons/OfficeCard";
import { SetterValues } from "./SetterValues";

export default function User({ id }) {
  const [office, setOffice] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const office = await axiosInstance.get(`/admin/offices/${id}`);
        setOffice(office.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <OfficeCard office={office} />
      <SetterValues id={id}/>
    </div>
  );
}
