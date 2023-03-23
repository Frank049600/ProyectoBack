const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
require('dotenv/config')

// Firebase
const { initializeApp } = require('firebase/app')
const { collection, getDoc, getFirestore, setDoc, doc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore')

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
    if(!nombre || nombre.length < 3) {
        res.json({ 'alert': 'El nombre debe tener mínimo 3 caractéres' })
    }else if(!apaterno || apaterno.length < 3){
        res.json({ 'alert': 'El apellido paterno debe tener mínimo 3 caractéres' })
    }else if(!amaterno || amaterno.length < 3){
        res.json({ 'alert': 'El apellido materno debe tener mínimo 3 caractéres' })
    }else if(!direccion || direccion.length < 3){
        res.json({ 'alert': 'La dirección debe tener mínimo 3 caractéres' })
    }else if(!Number(telefono) || telefono.length != 10){
        res.json({ 'alert': 'Escribe un telefóno valido' })
    }else if(!ciudad || ciudad.length < 3){
        res.json({ 'alert': 'La ciudad debe tener mínimo 3 caractéres' })
    }else if(!estado || estado.length < 3){
        res.json({ 'alert': 'El estado debe tener mínimo 3 caractéres' })
    }else if(!email || !email.length){
        res.json({ 'alert': 'Debes de introducir un correo electronico' })
    }else{
        const contactos = collection(db, 'contactos')

        // Verificar que el correo no exista en la base de datos
        getDoc(doc(contactos, email)).then((contacto) => {
            if(contacto.exists()){
                res.json({ 'alert': 'El correo ya esta registrado' })
            }else{
                const data = {
                    nombre,
                    apaterno,
                    amaterno,
                    direccion,
                    telefono,
                    ciudad,
                    estado,
                    email
                }

                setDoc(doc(contactos, email), data).then(() => {
                    res.json({
                        'alert': 'success'
                    })
                })
            }
        })
    }
}) 

//Ruta para leer o traer todos los datos de una colección
app.get('/read', async(req, res) => {

    const colContactos = collection(db, 'contactos')
    const docContactos = await getDocs(colContactos)
    let regresa = []

    docContactos.forEach((contacto) => {
        regresa.push(contacto.data())
    })
    res.json({
        'alert': 'success',
        regresa
    })

})

//Para actualizar un registro de la colección
app.post('/update', (req, res) => {
    const { nombre, apaterno, amaterno, direccion, telefono, ciudad, estado, email } = req.body

    if(!nombre || nombre.length < 3) {
        res.json({ 'alert': 'El nombre debe tener mínimo 3 caractéres' })
    }else if(!apaterno || apaterno.length < 3){
        res.json({ 'alert': 'El apellido paterno debe tener mínimo 3 caractéres' })
    }else if(!amaterno || amaterno.length < 3){
        res.json({ 'alert': 'El apellido materno debe tener mínimo 3 caractéres' })
    }else if(!direccion || direccion.length < 3){
        res.json({ 'alert': 'La dirección debe tener mínimo 3 caractéres' })
    }else if(!Number(telefono) || telefono.length != 10){
        res.json({ 'alert': 'Escribe un telefóno valido' })
    }else if(!ciudad || ciudad.length < 3){
        res.json({ 'alert': 'La ciudad debe tener mínimo 3 caractéres' })
    }else if(!estado || estado.length < 3){
        res.json({ 'alert': 'El estado debe tener mínimo 3 caractéres' })
    }else if(!email || !email.length){
        res.json({ 'alert': 'Debes de introducir un correo electronico' })
    }else{
        const updateData = {
            nombre,
            apaterno,
            amaterno,
            direccion,
            telefono,
            ciudad,
            estado
        }

        updateDoc(doc(db, 'contactos', email), updateData).then(() => {
            res.json({
                'alert': 'update success'
            })
        }).catch((error) => {
            res.json({
                'alert': error
            })
        })
    }

})

// Ruta para borrar un registro de la colección
app.post('/delete', (req, res) => {

    const { email } = req.body //Se optiene el email desde el body
    const contactoBorrar = doc(db, 'contactos', email) //Va a la colección y busca la variable con ese valor y se guarda en la variable
    //console.log(contactoBorrar)
    deleteDoc(contactoBorrar)

    res.json({
        'alert': 'success erased'
    })

})

// Poner sevidor en escucha
const PORT = process.env.PORT || 20000

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
})