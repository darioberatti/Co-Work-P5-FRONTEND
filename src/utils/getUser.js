import { cookies } from "next/headers";

const apiUrl = process.env.API_URL;

export default async function userData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  //console.log("TOKEN>>>>>", token.value);
  const options = {
    headers: {
      Authorization: "Bearer " + token.value,
      "content-type": "application/json",
    },
  };
  const user = await fetch(`${apiUrl}/user/me`, options);
  //console.log("OPTIONS-----", options);

  if (!user) {
    throw new Error("Failed to fetch data");
  }

  const userData = await user.json();
  //console.log("USER DEL FETCH-----", userData);

  return userData;
}
