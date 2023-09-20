"use client";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { Card, Text } from "@radix-ui/themes";

export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [birth, setBirth] = useState("");
  const [course, setCourse] = useState();

  const handleSubmit = () => {
    console.log("name-->", name);
    console.log("lastName-->", lastName);
    console.log("email-->", email);
    console.log("dni-->", dni);
    console.log("birth-->", birth);
    console.log("course-->", course);
  };

  return (
    <Card>
      <Form.Root className="FormRoot">
      <Text size={"8"} align="center" as="div">Crea un usuario</Text>
        <Form.Field className="FormField" name="name">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Nombre</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese un nombre
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un nombre válido
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="lastName">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Apellido</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese un apellido
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un apellido válido
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="email">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Email</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese un email
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un email válido
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="dni">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">DNI</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese un DNI
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un DNI válido
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="number"
              required
              onChange={(e) => setDni(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="birth">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Fecha de nacimiento</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese una fecha de nacimiento
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una fecha de nacimiento válida
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="date"
              required
              onChange={(e) => setBirth(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="course">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Curso</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese una curso
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una curso válido
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              required
              onChange={(e) => setCourse(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button
            className="Button"
            style={{ marginTop: 10 }}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Registrar
          </button>
        </Form.Submit>
      </Form.Root>
    </Card>
  );
}
