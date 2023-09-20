"use client";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { Card, Text } from "@radix-ui/themes";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("email-->", email);
    console.log("password-->", password);
  };

  return (
    <Card>
      <Form.Root className="FormRoot">
        <Text size={"8"} align="center" as="div">Inicia sesión</Text>
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

        <Form.Field className="FormField" name="password">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Contraseña</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese la contraseña
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una contraseña válida
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
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
            Ingresar
          </button>
        </Form.Submit>
      </Form.Root>
    </Card>
  );
}
