const express = require('express')
const apiRoute = require('./routes/api.routes')
const serverConfig = require('./config/serverConfig')

const app = express()
const PORT = process.env.PORT ?? 3000

serverConfig(app)

app.use('/api', apiRoute)

app.listen(PORT, () =>
    console.log(`Осторожно: работает порт ${PORT}`)

)
