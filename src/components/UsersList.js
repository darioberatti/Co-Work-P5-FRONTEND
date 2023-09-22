import { Table, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function UsersList() {
  return (
    <div>
      <Text size={"8"} align="center" as="div">
        Lista de Usuarios
      </Text>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Rol</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Ver</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Mateo Navarro</Table.RowHeaderCell>
            <Table.Cell>mateo@gmail.com</Table.Cell>
            <Table.Cell>estudiante</Table.Cell>

            <Table.Cell>
              <Link href={"/users/1"}>+</Link>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>German Cuevas</Table.RowHeaderCell>
            <Table.Cell>german@gmail.com</Table.Cell>
            <Table.Cell>staff</Table.Cell>

            <Table.Cell>
              <Link href={"/users/2"}>+</Link>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Juan Manuel Tierno</Table.RowHeaderCell>
            <Table.Cell>juan@gmail.com</Table.Cell>
            <Table.Cell>admin</Table.Cell>

            <Table.Cell>
              <Link href={"/users/3"}>+</Link>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
}
