import multer, { StorageEngine, Multer } from 'multer'
import path from 'path'

// Initialize Multer storage engine
// In order of readability no need to type parameters in the following middleware functions
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images') // destination folder for uploaded files (this is excuted from the /dist folder)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // fieldname is the name of the input field, datetime for uniqueness, and path.extname for the file extension
    }
})

const upload: Multer = multer({ storage: storage })

export default upload // Export the upload middleware for use in the router