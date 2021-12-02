require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const apiRouter = require('./router/api')
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/api", apiRouter)

app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.listen(process.env.SERVER_PORT, ()=>{
    console.log('Server started at (port '+process.env.SERVER_PORT+')...')
})