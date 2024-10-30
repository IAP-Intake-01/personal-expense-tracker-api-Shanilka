const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shanilka800@#",
    database: "my_expenses"
})

app.post('/reg_user', (req, res) => {
    sql = "INSERT INTO users (`name`,`email`, `password`) VALUES (?,?,?)";

    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ]
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: "Register UnSuccessfully " + err })
        return req.json({ success: "Register Successfully" })
    })
});

app.listen(port, () => {
    console.log(`Server is Listening ${port}`)
})

