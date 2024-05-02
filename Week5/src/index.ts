// Help for understanding different status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

import { Request, Response, NextFunction, Router } from 'express'
import { Poem, IPoem } from '../models/Poem'
import populatePoems from '../data/poems'

const router: Router = Router()

// Fetch all poems from database with asynchronous function / database query
router.get('/api/poems', async (req: Request, res: Response) => {
    try {
        const poems: IPoem[] | null = await Poem.find()
        if (!poems) {
            return res.status(404).json({message: 'No poems found'})
        }
        console.log('poems fetched successfully from database')
        return res.json(poems)
    } catch (error: any) {
        console.error(`Error while fetching poems: ${error}`)
        return res.status(500).json({message: 'Internal server error'})
    }
})

// get poem by id from request parameter
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const poem: IPoem | null = await Poem.findById(req.params.id)
        if (!poem) {
            return res.status(404).json({message: 'Poem not found'})
        }
        res.json(poem)
    } catch (error: any) {
        console.error(`Error while fetching poem: ${error}`)
        return res.status(500).json({message: 'Internal server error'})
    }
})

// Save a new poem to the database
router.post('/api/poems', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingPoem: IPoem | null = await Poem.findOne({poem: req.body.poem}) // Check if poem already exists in database
        
        if (existingPoem) {
            return res.status(403).json({message: 'Poem already exists'})
        }
        
        const poem: IPoem = new Poem({
            poem: req.body.poem,
            vip: req.body.vip,
            date: new Date()
        })
        await poem.save() // alternative way to save: await Poem.create(req.body), but this way we can add additional logic (datetime)
        console.log('Poem saved successfully to database')
        return res.status(201).json({message: 'Poem created successfully'}) // Optionally we can use here next() to call the next middleware
    
    } catch (error: any) {
        console.error(`Error while saving poem: ${error}`)
        return res.status(500).json({message: 'Internal server error'})
    }
})


// This route is for populating the database with some initial poems from the data/poems.ts file can be used for testing purposes
// Note: This route is accessible from the browser 'http://localhost:3000/api/poems/populate' and therefore should be protected in real application
router.get('/api/poems/populate', async (req: Request, res: Response) => {
    for (let i = 0; i < populatePoems.length; i++) {
        const poem: IPoem = new Poem({
            poem: populatePoems[i].poem,
            vip: false,
            date: new Date()
        })
        await poem.save()
    }
    console.log('Database populated successfully')
    res.json({message: 'Poems populated successfully'})
})

export default router