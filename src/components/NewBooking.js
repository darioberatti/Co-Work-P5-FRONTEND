"use client";

import { Button, Card, Text } from "@radix-ui/themes";
import * as Select from "@radix-ui/react-select";
import axiosInstance from "../../axiosConfig";
import { fetchUser } from "@/utils/fetchUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { toast } from "sonner";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export default function NewBooking() {
  const dispatch = useDispatch();
  const [offices, setOffices] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

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

  // console.log("offices ---> ", offices);
  // console.log("offices true ---> ", Boolean(offices));

  const handleSelectChange = (value) => {
    setSelectedOffice(value);

    setSelectedShift(null);
  };

  const handleShiftChange = (value) => {
    setSelectedShift(value);
  };

  const handleTableChange = (value) => {
    setSelectedTable(value);
  };


  const handleSubmit = async () => {
    // console.log("Selected Office:", selectedOffice);
    // console.log("Selected Floor:", selectedFloor);
    // console.log("Selected Table:", selectedTable);
    // console.log("Selected Shift:", selectedShift);
    // console.log("Selected Date:", selectedDate);
    // console.log("user", user);
    try {
      const dateTime = selectedDate + " 11:00:00";
      const formData = {
        day: dateTime,
        shift: selectedShift,
        status: "active",
        userId: user.userId,
        tableId: selectedTable.id,
      };

      const response = await axiosInstance.post("/booking", formData);
      toast.success("Reserva creada correctamente", { className: "alerts" });
    } catch (error) {
      toast.error(error.response.data, { className: "alerts" });
    }
  };

  return (
    <Card>
      {offices ? (
        <div className="booking-form">
          <h1>Reserva tu oficina</h1>

          {/* Select de Oficina */}
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

          {/* Select de Mesa */}

          <Select.Root value={selectedTable} onValueChange={handleTableChange}>
            <Select.Trigger className="SelectTrigger" aria-label="Mesa">
              <Select.Value>
                {selectedTable ? selectedTable.name : "Selecciona una mesa"}
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
                    {selectedOffice?.tables.map((table) => (
                      <Select.Item
                        className="SelectItem"
                        key={table.id}
                        value={table}
                      >
                        {table.name}
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

          {/* Select de Turno */}
          <Select.Root value={selectedShift} onValueChange={handleShiftChange}>
            <Select.Trigger className="SelectTrigger" aria-label="Shift">
              <Select.Value>
                {selectedShift ? selectedShift : "Selecciona el turno"}
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
                    <Select.Item className="SelectItem" value="mañana">
                      Mañana: 9:00 a 13:00hs
                    </Select.Item>
                    <Select.Item className="SelectItem" value="tarde">
                      Tarde: 14:00 a 18:00hs
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                  <ChevronDownIcon />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <div className="date-picker SelectTrigger">
            <label htmlFor="date">Fecha </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit}>Enviar</Button>
        </div>
      ) : null}
    </Card>
  );
}


