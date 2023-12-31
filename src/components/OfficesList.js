"use client";

import { Card, Flex, Box, Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/utils/fetchUser";

export default function OfficesList() {
  const [offices, setOffices] = useState([]);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/admin/offices");
        response["data"].sort((a, b) => {
          const statusOrder = { enabled: 1, disabled: 2 };
          const statusComparison = statusOrder[a.status] - statusOrder[b.status];
          if (statusComparison === 0) {
            return a.id - b.id;
          }
          return statusComparison;
        });
        setOffices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: "monserrat, sans-serif", fontWeight: "400" }}>
      <div style={{ textAlign: "center" }}></div>
      <div style={{ margin: "10px", display: "flex", justifyContent: "center" }}>
        {user.role === "admin" ? (
          <Link href={`/admin/new-office`}>
            <Button variant="solid" color="indigo" style={{ marginLeft: "10px" }}>
              Crear Nueva Oficina
            </Button>
          </Link>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", 
          justifyContent: "center",
        }}
      >
        {offices?.map((office) => {
          const isDisabled = office.status === "disabled";

          return (
            <div
              key={office.id}
              style={{ marginBottom: "20px", opacity: isDisabled ? 0.5 : 1 }}
            >
              <Card size="3" style={{ maxWidth: "380px", maxHeight: "210px", minWidth: "380px", minHeight: "210px", margin: "10px" }}>
                <Flex align="center" gap={4}>
                  <img
                    src={office.urlImg[0]}
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
                      {`${office.city}, ${office.province}`}
                    </Text>
                    <Text as="div" color="gray" mb="1" size="2">
                      {office.country}
                    </Text>
                    <Link href={`/offices/${office.id}`}>
                      <Button color="indigo" variant="soft">
                        Detalles
                      </Button>
                    </Link>
                  </Box>
                </Flex>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}