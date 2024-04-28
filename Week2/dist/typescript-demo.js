"use strict";
/**
 * Pre-requisites:
 * - Node.js version 20.11.1 (preferably in Path)
 * @link https://nodejs.org/en/download/
 *
 * Install TypeScript globally:
 * - npm install -g typescript
 *
 * Initialize TypeScript in your project:
 * - tsc --init
 *
 * In tsconfig.json, uncomment and modify the following lines:
 * - "target": "esNext", (latest ECMAScript standard)
 * - "outDir": "./dist",
 * - "noEmitOnError": true
 *
 * Compile TypeScript file and run the JavaScript file:
 * - tsc
 * - node <filename>.js
 */
let myName;
myName = "John Doe";
let myAge;
myAge = 21;
// myAge = "21" // Error: Type '"21"' is not assignable to type 'number'.
console.log(`My name is ${myName} and I am ${myAge} years old.`);
let person = {
    name: "Jane Doe",
    age: 21,
    isStudent: true,
    id: 1
};
console.log(person);
let person2 = {
    name: "Jack Doe",
    age: 21,
    isStudent: false,
    id: 2
};
console.log(person2);
let student = {
    name: "Julia Doe",
    age: 21,
    id: 3,
    course: "Computer Science"
};
console.log(student);
// Functions are similar to JavaScript but with types.
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("world"));
// Optional type
let optional;
optional = "Hello";
console.log(optional);
optional = 123;
console.log(optional);
// Generics in TypeScript
function genericFunction(param) {
    return `parameter "param" is of type ${typeof param}`;
}
console.log(genericFunction("Hello"));
console.log(genericFunction(123));
console.log(genericFunction(true));
const response = {
    value: { status: 200, message: "Success" },
    isError: false
};
const response2 = {
    value: { status: 404, message: "Forbidden" },
    isError: true
};
