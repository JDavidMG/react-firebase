import React, { useState } from "react";
import firebaseApp from "../firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function Login() {
  const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario(email, password, rol) {
    if (!email || !password || !rol) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
      await setDoc(docuRef, { correo: email, rol: rol });
      alert("Usuario registrado exitosamente.");
    } catch (error) {
      console.error("Error registrando usuario:", error.message);
      if (error.code === "auth/email-already-in-use") {
        alert("Este correo ya está registrado.");
      } else {
        alert("Error registrando usuario: " + error.message);
      }
    }
  }

  async function iniciarSesion(email, password) {
    if (!email || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.code);
      if (error.code === "auth/user-not-found") {
        alert("La cuenta no está registrada.");
      } else if (error.code === "auth/wrong-password") {
        alert("Contraseña incorrecta.");
      } else if (error.code === "auth/invalid-email") {
        alert("Correo electrónico inválido.");
      } else {
        alert("Error al iniciar sesión");
      }
    }
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const rol = isRegistrando ? e.target.rol.value : null;

    if (isRegistrando) {
      registrarUsuario(email, password, rol);
    } else {
      iniciarSesion(email, password);
    }
  }

  return (
    <div>
      <h1>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>

      <form onSubmit={submitHandler}>
        <label>
          Correo electrónico:
          <input type="email" name="email" required />
        </label>

        <label>
          Contraseña:
          <input type="password" name="password" required />
        </label>

        {isRegistrando && (
          <label>
            Rol:
            <select name="rol" required>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </label>
        )}

        <input
          type="submit"
          value={isRegistrando ? "Registrar" : "Iniciar sesión"}
        />
      </form>

      <button onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
      </button>
    </div>
  );
}

export default Login;
