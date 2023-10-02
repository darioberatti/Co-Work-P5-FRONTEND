"use client";

import * as Form from "@radix-ui/react-form";
import { Card, Text } from "@radix-ui/themes";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../axiosConfig";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ForgotPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (formData) => {
      try {
        const response = await axiosInstance.post(
          "/user/reset-password",
          formData
        );
        toast.success("CCorreo de recuperación enviado", {className:"alerts"});

        router.push("/");
      } catch (error) {
        toast.error(error.response.data, {className:"alerts"});
        
      }
    },
  });

  return (
    <Card>
      <Form.Root className="FormRoot" onSubmit={formik.handleSubmit}>
        <Text size={"8"} align="center" as="div">
          Restablecer Contraseña
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

        <Form.Submit asChild>
          <button className="Button" style={{ marginTop: 10 }}>
            Enviar
          </button>
        </Form.Submit>
      </Form.Root>
    </Card>
  );
}
