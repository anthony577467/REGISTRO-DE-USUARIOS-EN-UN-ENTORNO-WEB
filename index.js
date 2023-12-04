const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'formulariowed'
  });
conexion.connect((err)=>{
    if (err){
    console.error("error al conectar", err);
    return;}
    console.log("conexion exitosa");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/HTML', express.static(path.join(__dirname, 'HTML')));
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
app.use('/JS', express.static(path.join(__dirname, 'JS')));
app.get("/", function (req, res) {
    var filePath = path.join(__dirname, "/HTML/index.html");
    res.sendFile(filePath);
});

app.post('/enviarDatos', (req, res) => {
    const { apellidos_nombres, dni, fecha_nacimiento, correo, password, terminos } = req.body;

    // Insertar datos en la base de datos
    const sql = 'INSERT INTO estudiantes (apellidos_nombres, dni, fecha_nacimiento, correo, contrasena ) VALUES (?, ?, ?, ?, ? )';
    const values = [apellidos_nombres, dni, fecha_nacimiento, correo, password, terminos];

    conexion.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la base de datos:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        console.log('Datos guardados correctamente');
        res.send('Datos guardados correctamente');
    });
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});