"use client";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { Card, Text } from "@radix-ui/themes";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [dni, setDni] = useState("");
  // const [birth, setBirth] = useState("");
  // const [course, setCourse] = useState();

  // const handleSubmit = () => {
  //   console.log("name-->", name);
  //   console.log("lastName-->", lastName);
  //   console.log("email-->", email);
  //   console.log("dni-->", dni);
  //   console.log("birth-->", birth);
  //   console.log("course-->", course);
  // };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      dni: "",
      birth: "",
      course: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      lastName: Yup.string().required(),
      email: Yup.string().email().required(),
      dni: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits")
      .min(8, 'Must be exactly 5 digits')
      .max(8, 'Must be exactly 5 digits'),
      
      birth: Yup.date().required(),
      course: Yup.string().required(),
    }),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });



  return (
    <Card>
      <Form.Root className="FormRoot" onSubmit={formik.handleSubmit}>
        <Text size={"8"} align="center" as="div">
          Crea un usuario
        </Text>
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
            {formik.errors.name && formik.values.name ? (
              <Form.Message className="FormMessage">
                Ingrese un nombre válido
              </Form.Message>
            ) : (
              ""
            )}
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              required
              onChange={formik.handleChange}
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
            {formik.errors.lastName && formik.values.lastName ? (
              <Form.Message className="FormMessage">
                Ingrese un apellido válido
              </Form.Message>
            ) : (
              ""
            )}
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              required
              onChange={formik.handleChange}
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

        <Form.Field className="FormField" name="dni">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">DNI (sin puntos)</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese un DNI
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un DNI válido
            </Form.Message>
            {formik.errors.dni && formik.values.dni ? (
              <Form.Message className="FormMessage">
                Ingrese un DNI válido
              </Form.Message>
            ) : (
              ""
            )}
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="number"
              required
              onChange={formik.handleChange}
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
              Ingrese una fecha
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una fecha válida
            </Form.Message>
            {formik.errors.birth && formik.values.birth ? (
              <Form.Message className="FormMessage">
                Ingrese una fecha válida
              </Form.Message>
            ) : (
              ""
            )}
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="date"
              required
              onChange={formik.handleChange}
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
              Ingrese un curso
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un curso válido
            </Form.Message>
            {formik.errors.course && formik.values.course ? (
              <Form.Message className="FormMessage">
                Ingrese un curso válido
              </Form.Message>
            ) : (
              ""
            )}
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              required
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button className="Button" style={{ marginTop: 10 }}>
            Registrar
          </button>
        </Form.Submit>
      </Form.Root>
    </Card>
  );
}
