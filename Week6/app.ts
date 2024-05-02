/**
 * Initialize TypeScript with tsc --init (modify configuration in tsconfig.json as previously instructed)
 * Initialize node with npm init -y (-y for default settings)
 * Install: 
 *  - express.js (npm install express)
 *  - path (npm install path)
 *  - mongoose (npm install mongoose)
 *  - morgan (npm install morgan)
 *  - multer (npm install multer)
 * 
 * In typescript some libraries do not have type definitions, so we need to install them separately:
 *  - npm install --save-dev @types/express (save as a development dependency -> only needed for development)
 *  - npm install --save-dev @types/morgan
 *  - npm install --save-dev @types/multer
 * 
 * Nodemon and tsc-watch are also useful for development:
 *  - npm install --save-dev nodemon
 *  - npm install --save-dev tsc-watch
 * 
 * Add the following scripts to package.json:
 *  - "start": "tsc-watch --onSuccess \"nodemon dist/app.js\""
 *  - This script will compile the TypeScript code and run the server with nodemon
 * 
 * Install MongoDB community server from https://www.mongodb.com/try/download/community (MongoDB Compass GUI is also highly recommended)
 * 
 * Postman vscode extension highly recommended for testing APIs
*/

import express, { Express } from 'express'
import path from 'path'
import morgan from 'morgan'
import mongoose, { Connection } from 'mongoose'
import router from './src/routes/index'

const app: Express = express()
const port: number = 3000

// Initialize MongoDB connection
const mongoDB: string = 'mongodb://127.0.0.1:27017/imageboardDB'
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
