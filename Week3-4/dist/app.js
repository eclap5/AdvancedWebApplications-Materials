"use strict";
/**
 * Initialize TypeScript with tsc --init (modify configuration in tsconfig.json as previously instructed)
 * Initialize node with npm init -y (-y for default settings)
 * Install:
 *  - express.js (npm install express)
 *  - path (npm install path)
 *  - morgan (npm install morgan)
 *
 * In typescript some libraries do not have type definitions, so we need to install them separately:
 *  - npm install --save-dev @types/express (save as a development dependency -> only needed for development)
 *  - npm install --save-dev @types/morgan
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./src/index"));
const app = (0, express_1.default)();
const port = 3000;
// Middlewares for parsing JSON and URL encoded data from the request body (particularly for POST and PUT requests)
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
// Morgan is also useful to log requests to the console
// https://www.npmjs.com/package/morgan
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
// Static files from the public directory (e.g. html, css, js)
// Path must be accessed from the root directory (NOTE: code is executed from /dist directory)
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/', index_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
