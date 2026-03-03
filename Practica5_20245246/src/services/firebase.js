import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase usando variables de entorno
// Crea un archivo .env en la raíz del proyecto con las siguientes variables:
// VITE_FIREBASE_API_KEY=tu_api_key
// VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
// VITE_FIREBASE_PROJECT_ID=tu_project_id
// VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
// VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
// VITE_FIREBASE_APP_ID=tu_app_id

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
