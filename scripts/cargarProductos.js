// Importamos Firebase directo
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Configuración de Firebase (la misma que en tu proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyBLG4785COEvlznAbGjQ_Kqim2CJhhuQo",
  authDomain: "pepshop-8cc16.firebaseapp.com",
  projectId: "pepshop-8cc16",
  storageBucket: "pepshop-8cc16.appspot.com",
  messagingSenderId: "580462653305",
  appId: "1:580462653305:web:1e1dc6f1392fbddb6349a8"
};

// Inicializamos Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lista de productos
const productos = [
  {
    name: "Alimento Balanceado Adulto",
    imagen: "https://i.ibb.co/fV1rX3Qj/imagen2.webp",
    price: "54000",
    description: "Fórmula premium sin colorantes, ideal para perros adultos",
  },
  {
    name: "Collar antipulgas",
    imagen: "https://i.ibb.co/PvPXLhdt/imagen1.jpg",
    price: "14000",
    description: "Protección continua contra pulgas y garrapatas",
  },
  {
    name: "Cama Mediana Acolchada",
    imagen: "https://i.ibb.co/jPXtpQrt/imagen3.webp",
    price: "35000",
    description: "Súper cómoda, lavable y antideslizante",
  },
  {
    name: "Juguete Mordillo de Goma",
    imagen: "https://i.ibb.co/HTrxZdD3/imagen4.webp",
    price: "5000",
    description: "Resistente y seguro para masticar",
  },
  {
    name: "Shampoo Hipoalergénico",
    imagen: "https://i.ibb.co/rfxRSQHv/champuu.webp",
    price: "8700",
    description: "Limpieza suave para pieles sensibles",
  },
  {
    name: "Pelota con sonido",
    imagen: "https://i.ibb.co/tp6jGqZR/pelota.jpg",
    price: "4200",
    description: "Ideal para juegos interactivos",
  },
  {
    name: "Arnés Ajustable",
    imagen: "https://i.ibb.co/mCBSRVTg/arnes.webp",
    price: "18500",
    description: "Con refuerzo acolchado y seguro",
  },
  {
    name: "Rascador de gato",
    imagen: "https://i.ibb.co/LwvfkyF/rascador.jpg",
    price: "28000",
    description: "Con base de madera y cuerda sisal",
  },
  {
    name: "Transportadora Mediana",
    imagen: "https://i.ibb.co/HfTvmjM9/trasportadora.jpg",
    price: "46000",
    description: "Aprobada para viajes y muy ventilada",
  },
  {
    name: "Bandeja Sanitaria",
    imagen: "https://i.ibb.co/zWqpP98h/bandeja.jpg",
    price: "11000",
    description: "Con bordes elevado y base antideslizante",
  },
  {
    name: "Comedero Doble Inoxidable",
    imagen: "https://i.ibb.co/3YL56V1w/comedero.jpg",
    price: "9700",
    description: "Ideal para agua y alimento seco",
  },
  {
    name: "Golosinas Naturales",
    imagen: "https://i.ibb.co/Yqq9v0G/croquetas.jpg",
    price: "3900",
    description: "Snacks saludables sin aditivos",
  }
];

// Función para cargar productos a Firebase
const cargarProductos = async () => {
  try {
    for (const producto of productos) {
      await addDoc(collection(db, "productos"), producto);
      console.log(`✅ Producto agregado: ${producto.name}`);
    }
    console.log("🎉 Todos los productos fueron cargados correctamente");
  } catch (error) {
    console.error("❌ Error al cargar productos:", error);
  }
};

cargarProductos();
