"use strict";
// Help for understanding different status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Poem_1 = require("../models/Poem");
const poems_1 = __importDefault(require("../data/poems"));
const router = (0, express_1.Router)();
// Fetch all poems from database with asynchronous function / database query
router.get('/api/poems', async (req, res) => {
    try {
        const poems = await Poem_1.Poem.find();
        if (!poems) {
            return res.status(404).json({ message: 'No poems found' });
        }
        console.log('poems fetched successfully from database');
        return res.json(poems);
    }
    catch (error) {
        console.error(`Error while fetching poems: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// get poem by id from request parameter
router.get('/:id', async (req, res) => {
    try {
        const poem = await Poem_1.Poem.findById(req.params.id);
        if (!poem) {
            return res.status(404).json({ message: 'Poem not found' });
        }
        res.json(poem);
    }
    catch (error) {
        console.error(`Error while fetching poem: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// Save a new poem to the database
router.post('/api/poems', async (req, res, next) => {
    try {
        const existingPoem = await Poem_1.Poem.findOne({ poem: req.body.poem });
        if (existingPoem) {
            return res.status(403).json({ message: 'Poem already exists' });
        }
        const poem = new Poem_1.Poem({
            poem: req.body.poem,
            vip: req.body.vip,
            date: new Date()
        });
        await poem.save(); // alternative way to save: await Poem.create(req.body), but this way we can add additional logic (datetime)
        console.log('Poem saved successfully to database');
        return res.status(201).json({ message: 'Poem created successfully' }); // Optionally we can use here next() to call the next middleware
    }
    catch (error) {
        console.error(`Error while saving poem: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// This route is for populating the database with some initial poems from the data/poems.ts file can be used for testing purposes
// Note: This route is accessible from the browser 'http://localhost:3000/api/poems/populate' and therefore should be protected in real application
router.get('/api/poems/populate', async (req, res) => {
    for (let i = 0; i < poems_1.default.length; i++) {
        const poem = new Poem_1.Poem({
            poem: poems_1.default[i].poem,
            vip: false,
            date: new Date()
        });
        await poem.save();
    }
    console.log('Database populated successfully');
    res.json({ message: 'Poems populated successfully' });
});
exports.default = router;
