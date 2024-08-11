const express = require('express')
const cookieParser = require('cookie-parser')


const serverConfig = (app) => {
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())
}


module.exports = serverConfig