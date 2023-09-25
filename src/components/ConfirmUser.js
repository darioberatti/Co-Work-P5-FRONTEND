"use client";

import * as Form from "@radix-ui/react-form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axiosInstance from "../../axiosConfig";

export default function ConfirmUser({ registerToken }) {
  const router = useRouter();

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
    onSubmit: async (formData) => {
      const password = formData.password;
      const newFormData = { password, registerToken };

      try {
        const response = await axiosInstance.post(
          "/staff/users/set-password",
          newFormData
        );
        console.log("response axios ---> ", response);
        window.alert("Contraseña establecida correctamente");
      } catch (error) {
        console.error("Error axios setPassword --> ", error);
      }
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
          <button
            className="Button"
            style={{ marginTop: 10 }}
            onClick={() => {
              router.push("/");
            }}
          >
            Ingresar
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
