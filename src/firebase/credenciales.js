// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyDJR-Mc0tnkmIUkGk5xXCoXl6F2pKDjYfA",
  authDomain: "makepizza-639f4.firebaseapp.com",
  projectId: "makepizza-639f4",
  storageBucket: "makepizza-639f4.firebasestorage.app",
  messagingSenderId: "467401798919",
  appId: "1:467401798919:web:6be2c90f43f1f00d1641a2"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
