"use client";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";

export default function ConfirmUser() {
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const handleSubmit = () => {
    console.log("password-->", password);
    console.log("secondPassword-->", secondPassword);
  };

  return (
    <div>
      <Form.Root className="FormRoot">
        <h1>¡Ya casi!</h1>
        <h3>Elija una contraseña</h3>
       

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

        <Form.Field className="FormField" name="secondPassword">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Repita su contraseña</Form.Label>
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
              onChange={(e) => setSecondPassword(e.target.value)}
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
    </div>
  );
}
