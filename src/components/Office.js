"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/hooks/hooks";
import OfficeCard from "@/commons/OfficeCard";

export default function User({ id }) {
  const [office, setOffice] = useState({});

  const dispatch = useDispatch()

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

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
    </div>
  );
}
