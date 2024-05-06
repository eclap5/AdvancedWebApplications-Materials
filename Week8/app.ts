/**
 * Week8 will be a continuation of Week7. Copy the Week7 folder and rename it to Week8.
 * @link https://github.com/eclap5/AdvancedWebApplications-Materials/tree/main
 * 
 * Install following dependencies:
 * npm install passport
 * npm install passport-google-oauth20
 * 
 * npm install --save-dev @types/passport
 * npm install --save-dev @types/passport-google-oauth20
 * 
 * Add .env to the .gitignore file
 * 
 * Change DB address in app.ts to mongodb://127.0.0.1:27017/GoogleAuthDB
 * 
 * Check Readme.md for instructions to create Google Cloud Credentials
*/

import express, { Express } from 'express'
import path from 'path'
import morgan from 'morgan'
import mongoose, { Connection } from 'mongoose'
import dotenv from 'dotenv'
import router from './src/routes/index'
import passport from './src/middleware/google-passport-config' // NOTE: Import passport from google-passport-config.ts

// Load environment variables from .env file
dotenv.config()

const app: Express = express()
const port: number = parseInt(process.env.PORT as string) || 3000 // Secrets are stored as strings in .env file

// Initialize MongoDB connection
const mongoDB: string = 'mongodb://127.0.0.1:27017/GoogleAuthDB'
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))

// Middleware
app.use(passport.initialize()) // Import passport from middleware and initialize it
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Static files
app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
