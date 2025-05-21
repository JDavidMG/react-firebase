import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from "./firebase/credenciales";
import Home from "./screens/Home";
import Login from "./screens/Login";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        const docRef = doc(firestore, `usuarios/${usuarioFirebase.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser({ ...usuarioFirebase, rol: userData.rol });
        } else {
          setUser(usuarioFirebase); // sin rol
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  return <div>{user ? <Home user={user} /> : <Login />}</div>;
}

export default App;

