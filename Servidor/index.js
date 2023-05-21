//Importamos express y Mysql2
const express = require("express");
const mysql = require("mysql2");

//Creamos servidor
const app = express();

var userP;
//IMPORTANTISIMO para usar la comunicación con front
app.use(express.json()); 

app.use(express.static(__dirname + "public"))

app.use(express.urlencoded({ extended: false }))
const session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));


//Conexion a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pswd"
});

db.connect((err) => {
    if (err) {
        console.log("Error connecting to database")
        return
    }
    console.log("Connection to database is successfull")
})

app.get('/actualizarPswd/:id', (req, res) => {
    console.log("Entra")
    db.query("SELECT * FROM passwords WHERE id = ?", [req.params.id], (error, results) => {
        if (error) {
            console.log(error)
            return res.sendStatus(404)
        } else {
            res.json(results);
        }
    });
});

app.post('/editarPassword', (req, res) => {
    console.log("Entro edit")
    db.query('UPDATE passwords SET `provider` = ?, `password` = ?, `username` = ? WHERE `id` = ?', [req.body.provider, req.body.pswd, req.body.username, req.body.id], (error, results) => {
        if (error) {
            console.log("Error in updating data")
            return
        } else {
            res.send('Password Updated');
        }
    });
});

app.delete('/eliminarPassword/:id', (req, res) => {
    db.query("delete FROM passwords WHERE id = ?", parseInt([req.params.id]), (error, results) => {
        if (error) {
            console.log(error)
            return
        } else {
            res.send("Password deleted");
        }
    })
})


app.post('/insertUsuario', (req, res) => {
    console.log("Hola entro")
    userP = req.body;
    console.log(userP)
    db.query("INSERT IGNORE INTO user (email, token) VALUES (" + "'" + req.body.email + "','" + req.body.id + "')");
    res.send('Datos recibidos');
});

app.post('/insertarPswd', (req, res) => {
    console.log('insertando' + req.body.usuario)
    db.query("INSERT INTO passwords (username, provider, password, email_user) VALUES (?, ?, ?, ?)", [req.body.username, req.body.provider, req.body.pswd, req.body.usuario]);
    res.send('Insertar Añadido correctamente');
});

app.get('/listar/:email', async (req, res) => {
    db.query("SELECT * FROM passwords WHERE email_user = ?", [req.params.email], (error, results) => {
        if (error) {
            console.log(error)
            return
        } else {
            console.log(results)
            res.json(results);
        }
    })
})

app.get('/ordenarPswd/:email', async (req, res) => {
    db.query("SELECT * FROM passwords WHERE email_user = ? order by provider asc", [req.params.email], (error, results) => {
        if (error) {
            console.log(error)
            return
        } else {
            console.log(results)
            res.json(results);
        }
    })
})

// app.get('/listar', async (req, res) => {
//     console.log(req.body.usuario)
//     db.query("SELECT * FROM passwords where email_user = ?", [req.body.usuario] ,(error, results) =>{
//         if(error){
//             console.log(error)
//             return
//         }
//         else{
//             res.json(results)

//         }
//     })
// });


//Puerto 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App is listening to port 3000")
});