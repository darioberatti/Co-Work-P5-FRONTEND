"use client"

import { Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

export default function User({id}) {

  const [office, setOffice] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const office = await axios.get(`http://localhost:3001/admin/offices/${id}`);
        setOffice(office.data);
      } catch(error) {
        console.error(error);
      }
    };
    fetchData()
  }, []);

  console.log(office);

  return (
    <Card>
      <Flex direction={"column"}>
        <Text size={"7"}>{office.name}</Text>
        <Text size={"4"}>{office.address}</Text>
        <Text size={"4"}>Ciudad: {office.city}</Text>
        <Text size={"4"}>País: {office.country}</Text>
        <Text size={"4"}>Hora de apertura: {office.openingTime === null ? "X" : office.openingTime}</Text>
        <Text size={"4"}>Hora de cierre: {office.closingTime === null ? "X" : office.closingTime}</Text>
        <Text size={"4"}>Pisos: {office.floors}</Text>
        <Text size={"4"}>Número de telefono: {office.phoneNumber}</Text>
      </Flex>
    </Card>
  );
}
