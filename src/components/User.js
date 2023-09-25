"use client"

import { Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

export default function User({id}) {

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axios.get(`http://localhost:3001/staff/users/${id}`);
        setUser(user.data);
      } catch(error) {
        console.error(error);
      }
    };
    fetchData()
  }, []);


  return (
    <Card>
      <Flex direction={"column"}>
        <Text size={"7"}>{user.name} {user.lastName}</Text>
        <Text size={"4"}>{user.email}</Text>
        <Text size={"4"}>DNI: {user.DNI}</Text>
        <Text size={"4"}>Edad: {user.age}</Text>
        <Text size={"4"}>Curso: {user.course}</Text>
        <Text size={"4"}>Rol: {user.roleId}</Text>
      </Flex>
    </Card>
  );
}
