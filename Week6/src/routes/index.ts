import { Request, Response, Router } from 'express'
import { Image, IImage } from '../../models/Image'
import upload from '../middleware/multer-config'

const router: Router = Router()

// Get all images from the database and send metadata to the client
router.get('/api/images', async (req: Request, res: Response) => {
    try {
        const images: IImage[] | null = await Image.find()

        if (!images) {
            return res.status(404).json({message: 'No images found'})
        }
        console.log(images)
        res.status(200).json(images)
        console.log('Images fetched successfully from database')
    } catch (error: any) {
        console.error(`Error while fetching images: ${error}`)
        return res.status(500).json({message: 'Internal server error'})
    }
})

// Upload new image to the database and file system using the upload middleware
router.post('/api/upload', upload.single('image') , async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({message: 'No file uploaded'})
        }
        console.log(req.file.path)
        const imgPath: string = req.file.path.replace('public', '') // Remove the 'public' part of the path for the database
        console.log(imgPath)

        const image: IImage = new Image({
            filename: req.file.filename,
            description: req.body.description,
            path: imgPath
        })
        await image.save()
        console.log('File uploaded and saved successfully')
        return res.status(201).json({message: 'File uploaded and saved successfully'})
    } catch (error: any) {
        console.error(`Error while uploading file: ${error}`)
        return res.status(500).json({message: 'Internal server error'})
    }
})

// With patch method, we can update only specific fields of the document in the database (in this case description)
router.patch('/api/images/:id', async (req: Request, res: Response) => {
    try {
        const image: IImage | null = await Image.findById(req.params.id)

        if (!image) {
            return res.status(404).json({message: 'Image not found'})
        }

        image.description = req.body.description
        await image.save()

        res.status(200).json({message: 'Image updated successfully'})
        console.log('Image updated successfully')
    } catch (error: any) {
        console.error(`Error while updating image: ${error}`)
        return res.status(500).json({message: 'Internal server error'})
    }
})

export default router