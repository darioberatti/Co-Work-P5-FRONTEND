import { Card, Flex, Text } from "@radix-ui/themes";

export default function User() {
  return (
    <Card>
      <Flex direction={"column"}>
        <Text size={"7"}>NombreUser</Text>
        <Text size={"4"}>Email@user.com</Text>
        <Text size={"4"}>DNI: 4020201010</Text>
        <Text size={"4"}>Edad: 24</Text>
        <Text size={"4"}>Curso: 4020201010</Text>
        <Text size={"4"}>Rol: estudiante/staff/admin</Text>
      </Flex>
    </Card>
  );
}
