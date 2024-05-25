const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 1234


app.use(cors())
app.use(express.json())

const db = new sqlite3.Database("./src/db.sqlite", sqlite3.OPEN_READWRITE, (err)=> {
    if (err) return console.error(err.message)
    console.log('Database Connected')
})


