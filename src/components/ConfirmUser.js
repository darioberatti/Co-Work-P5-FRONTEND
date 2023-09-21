"use client";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ConfirmUser() {
  // const [password, setPassword] = useState("");
  // const [secondPassword, setSecondPassword] = useState("");

  // const handleSubmit = () => {
  //   console.log("password-->", password);
  //   console.log("secondPassword-->", secondPassword);
  // };

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
      repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
    }),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });

  return (
    <div>
      <Form.Root className="FormRoot" onSubmit={formik.handleSubmit}>
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
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="repeatPassword">
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
            {formik.errors.repeatPassword && formik.values.repeatPassword ? (
              <Form.Message className="FormMessage">
                Las contraseñas no coinciden
              </Form.Message>
            ) : (
              ""
            )}
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
      </Form.Root>
    </div>
  );
}
