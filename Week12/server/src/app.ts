/**
 * This file is the entry point for the server application.
 * 
*/

import express, { Express } from 'express'
import morgan from 'morgan'
import mongoose, { Connection } from 'mongoose'
import dotenv from 'dotenv'
import cors, { CorsOptions } from 'cors'
import router from './routes'

dotenv.config()

const app: Express = express()
const port: number = parseInt(process.env.PORT as string) || 3000

const mongoDB: string = 'mongodb://127.0.0.1:27017/FullStackAppDB'
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))

// Create cors options to allow only the client application to access the server
const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}

// Initialize cors options to prevent cross-origin resource sharing
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/', router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
