"use client";

import { Card, Flex, Button, Text, Box } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";

export default function OfficesList() {
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3001/admin/offices"
        );
        setOffices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log("offices-->", offices);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", margin: "10px 0px" }}>
        <Text size={"8"} align="center" as="div">
          Lista de Oficinas
        </Text>
        <Link href={`/new-office`}>
          <Button variant="solid" color="indigo" style={{ marginLeft: "10px" }}>
            Add Office
          </Button>
        </Link>
      </div>

      {offices?.map((office) => (
        <div key={office.id} style={{ marginBottom: "20px" }}>
          <Card size="3" style={{ maxWidth: 400 }}>
            <Flex align="center" gap={4}>
              <img
                src="https://www.clarin.com/img/2017/08/22/Sy_gAZ9uW_720x0.jpg"
                alt="Icon"
                height="120px"
                width="120px"
              />
              <Box style={{ marginLeft: "10px" }}>
                <Text size="5">{office.name}</Text>
                <Text as="div" color="gray" mb="1" size="2">
                  {office.address}
                </Text>
                <Text as="div" color="gray" mb="1" size="2">
                  {office.city}
                </Text>
                <Text as="div" color="gray" mb="1" size="2">
                  {office.country}
                </Text>
                <Link href={`/offices/${office.id}`}>
                  <Button color="indigo" variant="soft">
                    More info
                  </Button>
                </Link>
              </Box>
            </Flex>
          </Card>
        </div>
      ))}
    </div>
  );
}
