import { Button, Card, Text } from "@radix-ui/themes";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Form from "@radix-ui/react-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useParams } from "next/navigation";
import { birthSetter } from "@/utils/changeDateFormat";
import User from "@/commons/User";

export default function EditUser() {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [editUser, setEditUser] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: "",
    lastName: "",
    email: "",
    DNI: "",
    birth: "",
    course: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axiosInstance.get(`/staff/users/${id}`);
        setUser(user.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    if (user.name) {
      const birthDate = user.birth && birthSetter(user.birth);
      const parts = birthDate.split("/");
      const formBirthDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

      setInitialValues({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        DNI: user.DNI,
        birth: formBirthDate,
        course: user.course,
      });
    }
  }, [user.name]);

  const formik = useFormik({
    initialValues: initialValues,
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

        .min(10000000)
        .max(99999999),

      birth: Yup.date().required(),
      course: Yup.string().required(),
    }),
    enableReinitialize: true,
    onSubmit: async (formData) => {
      try {
        const birthDate = formData.birth + " 11:00:00";
        formData.birth = birthDate;

        const response = axiosInstance.put(`/staff/users/${id}`, formData);

        toast.success("Usuario Actualizado", { className: "alerts" });
        handleEditUser();
      } catch (error) {
        toast.error(error.response.data, { className: "alerts" });
      }
    },
  });

  const handleEditUser = () => {
    editUser ? setEditUser(false) : setEditUser(true);
  };

  return (
    <>
      {editUser ? (
        <Card>
          <Form.Root className="FormRoot" onSubmit={formik.handleSubmit}>
            <Text size={"8"} align="center" as="div">
              Editar Usuario
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
                  value={formik.values.name}
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
                  value={formik.values.lastName}
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
                  value={formik.values.email}
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
                  value={formik.values.DNI}
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
                <Form.Label className="FormLabel">
                  Fecha de nacimiento
                </Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Ingrese un valor numérico
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
                  type="date"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.birth}
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
                  value={formik.values.course}
                />
              </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
              <button
                className="Button"
                style={{
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                Registrar Cambios
              </button>
            </Form.Submit>
          </Form.Root>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Button
              color="green"
              variant="soft"
              onClick={() => handleEditUser()}
            >
              Volver al Usuario
            </Button>
          </div>
        </Card>
      ) : (
        <User id={id} />
      )}
    </>
  );
}
