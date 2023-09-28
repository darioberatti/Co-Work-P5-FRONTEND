"use client";

import React from "react";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, Flex, Text, Box, Button } from "@radix-ui/themes";
import GoogleMap from "./GoogleMap";

export default function OfficeCard({ office }) {
  return (
    <Card size="3" style={{ maxWidth: 400 }}>
      <Carousel>
        {office.urlImg?.map((imageUrl, index) => (
          <div key={index} style={{ width: "100%", textAlign: "center" }}>
            <div
              style={{
                width: "100%",
                paddingBottom: "75%", // Mantener una relación de aspecto 4:3 (75%)
                position: "relative",
              }}
            >
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                style={{
                  objectFit: "cover", // Controlar cómo se ajusta la imagen
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                }}
              />
            </div>
          </div>
        ))}
      </Carousel>
      <Flex align="center" gap={4}>
        <Box style={{ marginLeft: "10px" }}>
          <Text size="6">{office.name}</Text>
          <Text as="div" color="gray" mb="1" size="3">
            {office.address}
          </Text>
          <Text as="div" color="gray" mb="1" size="3">
            {office.city}
          </Text>
          <Text as="div" color="gray" mb="1" size="3">
            {office.province}
          </Text>
          <Text as="div" color="gray" mb="1" size="3">
            {office.country}
          </Text>
          <Text as="div" color="gray" mb="1" size="3">
            Hora de apertura: {office.openingTime || "Consultalo con el Staff"}
          </Text>
          <Text as="div" color="gray" mb="1" size="3">
            Hora de cierre: {office.closingTime || "Consultalo con el Staff"}
          </Text>
          <Text as="div" color="gray" mb="1" size="3">
            Pisos disponibles: {office.floors}
          </Text>
          <Text as="div" color="gray" mb="1" size="3">
            Número de telefono: {office.phoneNumber}
          </Text>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {office.address ? (
              <GoogleMap
                address={`${office.address} ${office.city} ${office.province} ${office.country}`}
              />
            ) : (
              ""
            )}
          </div>
          <div
            style={{
              margin: "10px 0",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Link href={""}>
              <Button color="indigo" variant="soft">
                Reservar aquí
              </Button>
            </Link>
            <Link href={"/offices"}>
              <Button color="green" variant="soft">
                Volver a Oficinas
              </Button>
            </Link>
          </div>
        </Box>
      </Flex>
    </Card>
  );
}
