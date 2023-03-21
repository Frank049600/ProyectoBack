const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
require('dotenv/config')

// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Configuración claves firebase
const firebaseConfig = {
    apiKey: "AIzaSyBxDekVgGsYtSsF4Z4rMHQ2DpoTXtxHDtU",
    authDomain: "proyecto-backfirebase.firebaseapp.com",
    projectId: "proyecto-backfirebase",
    storageBucket: "proyecto-backfirebase.appspot.com",
    messagingSenderId: "124285161703",
    appId: "1:124285161703:web:4365a3785ce3873172d242"
  };

// Inicializar la BD
const firebase = initializeApp(firebaseConfig);
const db = getFirestore()

// Inicilizar el servidor
const app = express()

// Configuración CORS
const corsOptions = {
    "Origin": "*",
    "optionSuccessStatus": 200
}

app.use(express.json())
app.use(cors(corsOptions))


// Configuración Rutas
// Rutas para registrar un nuevo registro
app.post('/create', (req, res) => {
    const { nombre, apaterno, amaterno, direccion, telefono, ciudad, estado, email } = req.body
    
    // Validaciones de los datos
    if(nombre.length < 3) {
        res.json({ 'alert': 'El nombre debe tener mínimo 3 caractéres' })
    }
}) 

//Ruta para leer o traer todos los datos de una colección
app.get('/read', (req, res) => {

})

//Para actualizar un registro de la colección
app.post('/update/', (req, res) => {

})

// Ruta para borrar un registro de la colección
app.post('/delete', (req, res) => {

})

// Poner sevidor en escucha
const PORT = process.env.PORT || 20000

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
})