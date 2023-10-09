"use client";

import { Button, Card, Text } from "@radix-ui/themes";
import * as Select from "@radix-ui/react-select";
import axiosInstance from "../../axiosConfig";
import { fetchUser } from "@/utils/fetchUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { toast } from "sonner";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function NewBooking() {
  const dispatch = useDispatch();
  const [offices, setOffices] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const [occupation, setOccupation] = useState(null);
  const [viewOccupation, setViewOccupation] = useState(false);
  const [occupationByOffice, setOccupationByOffice] = useState(null);
  const [occupationByTable, setOccupationByTable] = useState(null);

  const [isDisabled, setIsDisabled] = useState(false);

  const user = useSelector((state) => state.user.value);

  const router = useRouter();

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const officeResponse = await axiosInstance.get(`/admin/offices`);
        const activeOffices = officeResponse.data.filter(
          (office) => office.status === "enabled"
        );
        setOffices(activeOffices);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const occupationResponse = await axiosInstance.get("/occupation");
        setOccupation(occupationResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Validate the occupation
  const handleOccupation = () => {
    if (selectedDate && selectedOffice && selectedShift) {
      const filteredOccupations = occupation.filter(
        (occ) =>
          occ.table.officeId === selectedOffice.id &&
          occ.shift === selectedShift &&
          occ.day.slice(0, 10) === selectedDate
      );

      setOccupationByOffice(filteredOccupations);
      setSelectedTable(null);
      setOccupationByTable(null);
      setViewOccupation(true);
      setIsDisabled(true);
    } else {
      toast.error("Campos incompletos", { className: "alerts" });
    }
  };

  useEffect(() => {
    if (occupationByOffice && selectedTable) {
      const filteredOccupationByTable = occupationByOffice.find(
        (occ) => occ.tableId === selectedTable.id
      );
      setOccupationByTable(filteredOccupationByTable);
    }
  }, [selectedTable]);

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

  const handleModification = () => {
    setSelectedTable(null);
    setIsDisabled(false);
  };

  const handleSubmit = async () => {
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
      router.push("/bookings");
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
            disabled={isDisabled}
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
              <Select.Content className="SelectContent" position="popper">
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

          {/* Select de Turno */}
          <Select.Root
            value={selectedShift}
            onValueChange={handleShiftChange}
            disabled={isDisabled}
          >
            <Select.Trigger className="SelectTrigger" aria-label="Shift">
              <Select.Value>
                {selectedShift ? selectedShift : "Selecciona el turno"}
              </Select.Value>
              <Select.Icon className="SelectIcon">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="SelectContent" position="popper">
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

          {/* Input Date */}

          <div className="date-picker SelectTrigger">
            <label htmlFor="date">Fecha </label>
            {isDisabled ? (
              <input
                disabled
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            ) : (
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            )}
          </div>

          {/* Modify selection Button */}
          {/* Occupancy check */}

          {isDisabled ? (
            <Button color="crimson" onClick={handleModification}>
              Modificar seleccion
            </Button>
          ) : (
            <Button onClick={handleOccupation}>Ver disponibilidad</Button>
          )}

          {/* Select de Mesa */}

          {viewOccupation ? (
            <Select.Root
              value={selectedTable}
              onValueChange={handleTableChange}
            >
              <Select.Trigger className="SelectTrigger" aria-label="Mesa">
                <Select.Value>
                  {selectedTable ? selectedTable.name : "Selecciona una mesa"}
                </Select.Value>
                <Select.Icon className="SelectIcon">
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="SelectContent" position="popper">
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
          ) : null}

          {occupationByTable ? (
            <p className="SelectTrigger">{`Lugares disponibles: ${occupationByTable.actualCapacity}`}</p>
          ) : selectedTable ? (
            <p className="SelectTrigger">{`Lugares disponibles: ${selectedTable.capacity}`}</p>
          ) : null}

          {selectedTable ? (
            <Button
              onClick={handleSubmit}
              disabled={occupationByTable?.actualCapacity < 1}
            >
              Reservar Turno
            </Button>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
