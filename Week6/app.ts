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
 * Install types for development (TypeScript):
 *  - npm install --save-dev @types/express
 *  - npm install --save-dev @types/morgan
 *  - npm install --save-dev @types/multer
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
