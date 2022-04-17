import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (_req, res) => {
    res.send('APP IS RUNNING')
})

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    )
    .catch((err) => console.log(err.message))
