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


let myName: string
myName = "John Doe"

let myAge: number
myAge = 21
// myAge = "21" // Error: Type '"21"' is not assignable to type 'number'.

console.log(`My name is ${myName} and I am ${myAge} years old.`)


// Type is a simple object type to store different data types. 
// Immutable compared to interface.
type TPerson = {
    name: string,
    age: number,
    isStudent?: boolean
    readonly id: number
}

let person: TPerson = {
    name: "Jane Doe",
    age: 21,
    isStudent: true,
    id: 1
}

console.log(person)


// Interface is mutable compared to type.
// Interface is used to define the structure of an object. In difference to type, interface can be extended.
interface IPerson {
    name: string
    age: number
    isStudent?: boolean
    id: number
}

let person2: IPerson = {
    name: "Jack Doe",
    age: 21,
    isStudent: false,
    id: 2
}

console.log(person2)

// Interface can be extended:
interface IStudent extends IPerson {
    course: string
}

let student: IStudent = {
    name: "Julia Doe",
    age: 21,
    id: 3,
    course: "Computer Science"
}

console.log(student)


// Functions are similar to JavaScript but with types.
function greet(name: string): string {
    return `Hello, ${name}!`
}

console.log(greet("world"))


// Optional type
let optional: string | number | null
optional = "Hello"
console.log(optional)
optional = 123
console.log(optional)