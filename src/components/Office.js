"use client";

import { Card, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/hooks/hooks";

export default function User({ id }) {
  const [office, setOffice] = useState({});

  const dispatch = useDispatch()

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const office = await axiosInstance.get(
          `http://localhost:3001/admin/offices/${id}`
        );
        setOffice(office.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(office);

  return (
    <div>
      <Card style={{borderRadius: "0px"}}> 
        <Flex direction={"column"}>
          <Text size={"7"}>{office.name}</Text>
          <Text size={"4"}>{office.address}</Text>
          <Text size={"4"}>Ciudad: {office.city}</Text>
          <Text size={"4"}>País: {office.country}</Text>
          <Text size={"4"}>
            Hora de apertura: {office.openingTime || "Consultalo con el Staff"}
          </Text>
          <Text size={"4"}>
            Hora de cierre: {office.closingTime || "Consultalo con el Staff"}
          </Text>
          <Text size={"4"}>Pisos: {office.floors}</Text>
          <Text size={"4"}>Número de telefono: {office.phoneNumber}</Text>
        </Flex>
      </Card>
    </div>
  );
}
