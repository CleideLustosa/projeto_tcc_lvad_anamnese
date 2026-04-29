import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa o banco de dados

const firebaseConfig = {
  apiKey: "AIzaSyDiIEJ-uuI9fC1upin-YJ_WdhtVcyQVc6A",
  authDomain: "anamnese-interface-lvad.firebaseapp.com",
  projectId: "anamnese-interface-lvad",
  storageBucket: "anamnese-interface-lvad.firebasestorage.app",
  messagingSenderId: "983607910626",
  appId: "1:983607910626:web:7e607b52c3041d4f82bebb"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore (Banco de Dados)
export const db = getFirestore(app); // Exportamos o 'db' para usar na Triagem.js