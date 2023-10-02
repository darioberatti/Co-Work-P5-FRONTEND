"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/hooks/fetchUser";
import Card from "@/commons/Card";
import { SetterValues } from "./SetterValues";

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
      <Card office={office} />
      <SetterValues id={id}/>
    </div>
  );
}
