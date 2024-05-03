/**
 * Initialize TypeScript with tsc --init (modify configuration in tsconfig.json as previously instructed)
 * Initialize node with npm init -y (-y for default settings)
 * Install: 
 *  - express.js (npm install express)
 *  - path (npm install path)
 *  - mongoose (npm install mongoose)
 *  - morgan (npm install morgan)
 *  - multer (npm install multer)
 *  - dotenv (npm install dotenv)
 *  - bcrypt (npm install bcrypt)
 *  - jsonwebtoken (npm install jsonwebtoken)
 * 
 * Install types for development (TypeScript):
 *  - npm install --save-dev @types/express
 *  - npm install --save-dev @types/morgan
 *  - npm install --save-dev @types/multer
 *  - npm install --save-dev @types/bcrypt
 *  - npm install --save-dev @types/jsonwebtoken
 * 
 * Install nodemon and tsc-watch for development:
 *  - npm install --save-dev nodemon
 *  - npm install --save-dev tsc-watch
 * 
 * Add the following script to package.json:
 *  - "start": "tsc-watch --onSuccess \"nodemon dist/app.js\""
 * 
 * Install MongoDB community server from https://www.mongodb.com/try/download/community (MongoDB Compass GUI is also highly recommended)
 * 
 * Postman vscode extension highly recommended for testing APIs
 * 
 * Create a .gitignore file and add /node_modules and /dist
*/

import express, { Express } from 'express'
import path, { parse } from 'path'
import morgan from 'morgan'
import mongoose, { Connection } from 'mongoose'
import dotenv from 'dotenv'
import router from './src/routes/index'

// Load environment variables from .env file
dotenv.config()

const app: Express = express()
const port: number = parseInt(process.env.PORT as string) || 3000 // Secrets are stored as strings in .env file

// Initialize MongoDB connection
const mongoDB: string = 'mongodb://127.0.0.1:27017/usercontrolDB'
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Static files
app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
