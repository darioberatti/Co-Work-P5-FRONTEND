"use client";

import * as Form from "@radix-ui/react-form";
import { Button, Card, Text } from "@radix-ui/themes";
import * as Select from "@radix-ui/react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axiosInstance from "../../axiosConfig";
import { fetchUser } from "@/utils/fetchUser";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export default function NewBooking(/*props*/) {
  // const { id } = props;
  const [offices, setOffices] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const officeResponse = await axiosInstance.get(`/admin/offices`);
        setOffices(officeResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log("offices ---> ", offices);
  // console.log("offices true ---> ", Boolean(offices));

  const handleSelectChange = (value) => {
    setSelectedOffice(value);
    setSelectedFloor(null);
  };

  const handleFloorChange = (value) => {
    setSelectedFloor(value);
  };

  const handleSubmit = () => {
    console.log("Selected Office:", selectedOffice);
    console.log("Selected Floor:", selectedFloor);
  };

  return (
    <Card>
      {offices ? (
        <>
          <h1>Reserva tu oficina</h1>

          <Select.Root
            // defaultValue={null}
            value={selectedOffice}
            onValueChange={handleSelectChange}
          >
            <Select.Trigger className="SelectTrigger" aria-label="Oficina">
              <Select.Value>
                {selectedOffice ? selectedOffice.name : "Selecciona la oficina"}
              </Select.Value>
              <Select.Icon className="SelectIcon">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="SelectContent">
                <Select.ScrollUpButton className="SelectScrollButton">
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="SelectViewport">
                  <Select.Group>
                    {offices.map((office) => (
                      <Select.Item
                        className="SelectItem"
                        key={office.id}
                        value={office}
                      >
                        {office.name}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                  <ChevronDownIcon />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <Select.Root value={selectedFloor} onValueChange={handleFloorChange}>
            <Select.Trigger className="SelectTrigger" aria-label="Piso">
              <Select.Value>
                {selectedFloor ? `Piso ${selectedFloor.number}` : "Selecciona un piso"}
              </Select.Value>
              <Select.Icon className="SelectIcon">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="SelectContent">
                <Select.ScrollUpButton className="SelectScrollButton">
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="SelectViewport">
                  <Select.Group>
                    {selectedOffice?.floors.map((floor) => (
                      <Select.Item
                        className="SelectItem"
                        key={floor.id}
                        value={floor}
                      >
                        {`Piso ${floor.number}`}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                  <ChevronDownIcon />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          

          <Button onClick={handleSubmit}>Enviar</Button>
        </>
      ) : null}
    </Card>
  );
}

/*
SELECT
<Card>
    {offices ? (
      <>
        <h1>Reserva tu oficina</h1>

        <Select.Root
          defaultValue={null}
          value={selectedOffice}
          onValueChange={handleSelectChange}
        >
          <Select.Trigger className="SelectTrigger" aria-label="Oficina">
            <Select.Value>
                {selectedOffice ? selectedOffice.name : "Selecciona tu oficina"}
              </Select.Value>
            <Select.Icon className="SelectIcon">
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="SelectContent">
              <Select.ScrollUpButton className="SelectScrollButton">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="SelectViewport">
                <Select.Group>
                  {offices.map((office) => (
                    <Select.Item
                      className="SelectItem"
                      key={office.id}
                      value={office}
                    >
                      {office.name}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton className="SelectScrollButton">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <Button onClick={handleSubmit}>Enviar</Button>
      </>
    ) : null}
  </Card>

*/

/*
  FORMULARIO
  <Card>
      <Form.Root className="FormRoot" onSubmit={formik.handleSubmit}>
        <Text size={"8"} align="center" as="div">
          Reserva tu oficina
        </Text>

        <Form.Field className="FormField" name="office">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Oficina</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese una oficina
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una oficina válida
            </Form.Message>
            {formik.errors.office && formik.values.office ? (
              <Form.Message className="FormMessage">
                Ingrese una oficina válida
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

        <Form.Field className="FormField" name="floor">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Piso</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese un piso
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un piso válido
            </Form.Message>
          </div>
          {office?.floors && (
            <Select className="Input" required onChange={formik.handleChange}>
              {office.floors.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.number}
                </option>
              ))}
            </Select>
          )}
        </Form.Field>

        <Form.Field className="FormField" name="date">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Fecha de reserva</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese una fecha
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese una fecha válida
            </Form.Message>
            {formik.errors.date && formik.values.date ? (
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

        <Form.Field className="FormField" name="shift">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Turno</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Ingrese unn turno
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Ingrese un turno válido
            </Form.Message>
            {formik.errors.shift && formik.values.shift ? (
              <Form.Message className="FormMessage">
                Ingrese un turno válido
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
            Reservar
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


*/
