const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
const connect = require('./db/connect')

app.use(express.json())
app.use(cors())

//Database connect

connect()


//Routes insert

const routes = require('./routes/router')

app.use('/api', routes)


//Server Port listener

app.listen(PORT, ()=>{
    console.log('Server Online')
})