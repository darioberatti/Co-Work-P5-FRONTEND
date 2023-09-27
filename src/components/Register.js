"use client";
import * as Form from "@radix-ui/react-form";
import { Card, Text } from "@radix-ui/themes";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";


export default function Register() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      DNI: "",
      age: "",
      course: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[aA-zZ\s]+$/)
        .required(),
      lastName: Yup.string()
        .matches(/^[aA-zZ\s]+$/)
        .required(),
      email: Yup.string().email().required(),
      DNI: Yup.number()
        .required()

        .min(1000000)
        .max(99999999),

      age: Yup.number().required(),
      course: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {

        const response = await axiosInstance.post("/staff/users", formData);
        console.log("response axios ---> ", response);
        router.push("/");

      } catch (error) {
        console.error("Error axios register --> ", error);
      }
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

        <Form.Field className="FormField" name="DNI">
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
            {formik.errors.DNI && formik.values.DNI ? (
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

        <Form.Field className="FormField" name="age">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Edad</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese un valor
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un valor numérico
            </Form.Message>
            {formik.errors.age && formik.values.age ? (
              <Form.Message className="FormMessage">
                Ingrese un valor númerico
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
