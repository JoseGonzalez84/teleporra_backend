import express from "express"
import mongoose from "mongoose"
import store from "./api/models/store.js"

const app = express()
const port = 5500
const mongoURL = "mongodb+srv://testing:vWBcWXNyXwxHTYMx@freakkluster.oqbzujq.mongodb.net/?retryWrites=true&w=majority"

// Conexión BBDD.
mongoose
    .connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));

// Middleware
app.use(express.json())

app.post("/api/user/create", (req, res) => {
    let clientData = req.body
    let userRecord = []

    userRecord.push({
        userName: clientData.userName,
        email: clientData.email,
        active: clientData.active,
        password: clientData.password
    })
})

// Endpoint via post.
app.post("/api/clients", (req, res) => {
    let clientData = req.body
    let mongoRecords = []

    clientData.forEach(client => {
        mongoRecords.push({
            firstName: client.firstName,
            phone: client.phone,
            address: client.address
        })
    });

    store
        .create(mongoRecords)
        .then(result => console.log(result))
        .catch(err => console.log(err))

    res.send("You have posted something")
})
// Mismo endpoint con distinto tipo de envío de datos.
app.delete("/api/clients", (req, res) => {
    store
        .deleteMany({})
        .then(() => console.log('Borrado correcto'))
        .catch(err => console.log(err))

    res.send("All items deleted")
})

// Endpoint web.
app.get("/api/clients", (req, res) => {
    store
        .find({})
        .then((result) => { res.status(200).send(result)})
        .catch((err) => { res.status(500).send(err)})
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})