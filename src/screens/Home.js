import React from "react";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebaseApp);

function Home({ user }) {
  return (
    <div>
      <h2>Bienvenido {user.rol === "admin" ? "Administrador" : "Usuario"}</h2>
      <button onClick={() => signOut(auth)}>Cerrar sesión</button>
      {user.rol === "admin" ? <AdminView /> : <UserView />}
    </div>
  );
}

export default Home;
