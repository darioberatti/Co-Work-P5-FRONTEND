"use client"

import Login from "../components/Login";


export default function Home() {
  // useEffect(() => {
  //   axios
  //     .get("/api/users/me", { withCredentials: true })
  //     .then((user) => {
  //       dispatch(loginUser(user.data.payload));
  //     })
  //     .catch((err) => console.error(err));

  
  // }, []);

  return (
    
      <main>
        <Login />
      </main>
 
  );
}
