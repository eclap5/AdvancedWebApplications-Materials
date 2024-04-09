"use strict";
/**
 * Initialize TypeScript with tsc --init (modify configuration in tsconfig.json as previously instructed)
 * Initialize node with npm init -y (-y for default settings)
 * Install:
 *  - express.js (npm install express)
 *  - path (npm install path)
 *  - mongoose (npm install mongoose)
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
 * Install MongoDB community server from https://www.mongodb.com/try/download/community (MongoDB Compass GUI is also highly recommended)
 *
 * Postman vscode extension highly recommended for testing APIs
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./src/index"));
const app = (0, express_1.default)();
const port = 3000;
// Initialize MongoDB connection
const mongoDB = 'mongodb://127.0.0.1:27017/poemdb';
mongoose_1.default.connect(mongoDB);
mongoose_1.default.Promise = Promise;
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/', index_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
