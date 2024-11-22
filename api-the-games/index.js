import express from 'express'
const app = express()
import mongoose from 'mongoose'
import cors from 'cors'

import gameRoutes from './routes/gameRoutes.js'

// Configurações do Express
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Configuração do Cors
app.use(cors())

app.use('/', gameRoutes)

// Iniciando conexão com o banco de dados do MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/the-games-api")

// Rodando a API na porta 4000
const port = 4000
app.listen(port, (error) => {
    if(error) {
        console.log(error)
    }
    console.log(`API rodando em http://localhost:${port}.`)
})