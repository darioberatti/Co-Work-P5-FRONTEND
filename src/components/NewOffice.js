"use client";
import * as Form from "@radix-ui/react-form";
import { Button, Card, Text } from "@radix-ui/themes";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axiosInstance from "../../axiosConfig";
import { fetchUser } from "@/hooks/fetchUser";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";


export default function NewOffice() {
  const router = useRouter();

  const dispatch = useDispatch()

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      city: "",
      province: "",
      country: "",
      openingTime: "",
      closingTime: "",
      floorsNumber: "",
      phoneNumber: "",
      urlImg: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[aA-zZ\s]+$/)
        .required(),
      address: Yup.string().required(),
      city: Yup.string()
        .matches(/^[aA-zZ\s]+$/)
        .required(),
      province: Yup.string()
        .matches(/^[aA-zZ\s]+$/)
        .required(),
      country: Yup.string()
        .matches(/^[aA-zZ\s]+$/)
        .required(),
      openingTime: Yup.string(),
      closingTime: Yup.string(),
      floorsNumber: Yup.number()
        .required()

        .min(1)
        .max(100),
      phoneNumber: Yup.number(),
    }),
    onSubmit: async (formData) => {
      try {
        console.log(formData);
        const response = await axiosInstance.post("/admin/offices", formData);
        console.log("response axios ---> ", response);
        router.push(`/offices`);
      } catch (error) {
        console.error("Error axios register --> ", error.message);
      }
    },
  });

  return (
    <Card>
      <Form.Root className="FormRoot" onSubmit={formik.handleSubmit}>
        <Text size={"8"} align="center" as="div">
          Crea una Oficina
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
              placeholder="Nueva Oficina"
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="address">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Dirección</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese una dirección
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una dirección válida
            </Form.Message>
            {formik.errors.address && formik.values.address ? (
              <Form.Message className="FormMessage">
                Ingrese una dirección válida
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
              placeholder="Mi direccion 1234"
              pattern="^[a-zA-Z0-9\s]+$"
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="city">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Ciudad</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese una ciudad
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una ciudad válida
            </Form.Message>
            {formik.errors.city && formik.values.email ? (
              <Form.Message className="FormMessage">
                Ingrese una ciudad válida
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
              placeholder="CABA"
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="province">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Provincia</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese una provincia
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una provincia válida
            </Form.Message>
            {formik.errors.city && formik.values.email ? (
              <Form.Message className="FormMessage">
                Ingrese una provincia válida
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
              placeholder="Buenos Aires"
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="country">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">País</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese un país
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un país válido
            </Form.Message>
            {formik.errors.country && formik.values.country ? (
              <Form.Message className="FormMessage">
                Ingrese un país válido
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
              placeholder="Argentina"
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="openingTime">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Hora de Apertura</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese una hora
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una hora válida
            </Form.Message>
            {formik.errors.openingTime && formik.values.openingTime ? (
              <Form.Message className="FormMessage">
                Ingrese una hora válida
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
              placeholder="9 hs"
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="closingTime">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Hora de Cierre</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese una hora
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una hora válida
            </Form.Message>
            {formik.errors.closingTime && formik.values.closingTime ? (
              <Form.Message className="FormMessage">
                Ingrese una hora válida
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
              placeholder="18 hs"
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="floorsNumber">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Pisos</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese una cantidad de pisos
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una cantidad de pisos válida
            </Form.Message>
            {formik.errors.floorsNumber && formik.values.floorsNumber ? (
              <Form.Message className="FormMessage">
                Ingrese una cantidad de pisos válida
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

        <Form.Field className="FormField" name="phoneNumber">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Número de Teléfono</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese un número de teléfono
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un número de teléfono válido
            </Form.Message>
            {formik.errors.phoneNumber && formik.values.phoneNumber ? (
              <Form.Message className="FormMessage">
                Ingrese un número de teléfono válido
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
              placeholder="1112345678"
              onChange={formik.handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="urlImg">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Form.Label className="FormLabel">URL de Imágenes</Form.Label>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                required
                placeholder="Separadas por comas"
                onChange={(e) => {
                  const urls = e.target.value
                    .split(",")
                    .map((url) => url.trim());
                  formik.setFieldValue("urlImg", urls);
                }}
              />
            </Form.Control>
          </div>
        </Form.Field>

        <Form.Submit asChild>
          <button className="Button" style={{ marginTop: 10 }}>
            Registrar
          </button>
        </Form.Submit>
      </Form.Root>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link href={"/offices"}>
          <Button color="green" variant="soft">
            Volver a Oficinas
          </Button>
        </Link>
      </div>
    </Card>
  );
}
