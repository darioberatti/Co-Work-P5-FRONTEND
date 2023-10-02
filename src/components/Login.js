"use client";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import { useEffect, useState } from "react";
import { Card, Text } from "@radix-ui/themes";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Field, ErrorMessage } from "formik";
import axiosInstance from "../../axiosConfig";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/hooks/fetchUser";
import { useDispatch } from "react-redux";

export default function Login() {
  const router = useRouter();

  const dispatch = useDispatch()

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        const response = await axiosInstance.post("/user/login", formData);
        alert("Has iniciado sesion");
        router.push("/home");
      } catch (error) {
        console.error(error.response.data);
      }
    },
  });

  const handlePasswordReset = () => {
    router.push("/forgot-password");
  };

  return (
    <Card>
      <Form.Root className="FormRoot" onSubmit={formik.handleSubmit}>
        <Text size={"8"} align="center" as="div">
          Inicia sesión
        </Text>
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
            {formik.errors.email && formik.values.email ? (
              <Form.Message className="FormMessage">
                Ingrese un email válido
              </Form.Message>
            ) : (
              ""
            )}
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="email"
              required
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button className="Button" style={{ marginTop: 10 }}>
            Ingresar
          </button>
        </Form.Submit>

        <button
          className="Button"
          style={{ marginTop: 10 }}
          onClick={handlePasswordReset}
        >
          Olvide mi contraseña
        </button>
      </Form.Root>
    </Card>
  );
}
