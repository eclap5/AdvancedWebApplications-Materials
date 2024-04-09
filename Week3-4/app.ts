/**
 * Initialize TypeScript with tsc --init (modify configuration in tsconfig.json as previously instructed)
 * Initialize node with npm init -y (-y for default settings)
 * Install: 
 *  - express.js (npm install express)
 *  - path (npm install path)
 * 
 * In typescript some libraries do not have type definitions, so we need to install them separately:
 *  - npm install --save-dev @types/express (save as a development dependency -> only needed for development)
 * 
 * Nodemon and tsc-watch are also useful for development:
 *  - npm install --save-dev nodemon
 *  - npm install --save-dev tsc-watch
 * 
 * Add the following scripts to package.json:
 *  - "start": "tsc-watch --onSuccess \"nodemon dist/app.js\""
 *  - This script will compile the TypeScript code and run the server with nodemon
 * 
 * Postman vscode extension highly recommended for testing APIs
*/

import express, { Express } from 'express'
import path from 'path'
import router from './src/index'

const app: Express = express()
const port: number = 3000

// Middlewares for parsing JSON and URL encoded data from the request body (particularly for POST and PUT requests)
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Static files from the public directory (e.g. html, css, js)
// Path must be accessed from the root directory (NOTE: code is executed from /dist directory)
app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})