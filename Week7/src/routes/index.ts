import { Request, Response, Router } from 'express'
import { body, Result, ValidationError, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User, IUser } from '../models/User'
import { validateToken } from '../middleware/validateToken'

const router: Router = Router()

router.post('/api/users/register',
    body("username").isLength({min: 3}).trim().escape(), // Sanitize input data, if more validation is needed, this can be separated as individual middleware function
    body("password").isLength({min: 5}),
    async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req)

    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const existingUser: IUser | null = await User.findOne({ username: req.body.username })
        console.log(existingUser)
        if (existingUser) {
            return res.status(403).json({ username: 'username already in use.' })
        }
        console.log(req.body)
        const salt: string = bcrypt.genSaltSync(10) // generate salt with 10 rounds for hashing
        const hash: string = bcrypt.hashSync(req.body.password, salt) // hash the password with the salt

        await User.create({
            username: req.body.username,
            password: hash
        })
        return res.status(200).json({ message: 'User registered successfully.' })
    } catch (error: any) {
        console.error(`Error during user registration: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post('/api/users/login', 
    body('username').trim().escape(),
    body('password').escape(), 
    async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const user: IUser | null = await User.findOne({ username: req.body.username })
        console.log(user)
        if (!user) {
            return res.status(403).json({ message: 'Login failed' })
        }
        
        // compare the password with the hashed password
        // id and username are stored in the token
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const jwtPayload: JwtPayload = {
                id: user._id,
                username: user.username
            }
            const token: string = jwt.sign(jwtPayload, process.env.SECRET as string, { expiresIn: '30m' }) //create token with 30 minutes expiration and return it to the client
            return res.status(200).json({ success: true, token })
        }
        return res.status(401).json({ message:'Invalid password' })
    } catch (error: any) {
        console.error(`Error during user login: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

// This route is protected by the validateToken middleware
// List all active users from database
router.get('/api/users/list', validateToken, async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find()
        return res.status(200).json(users)
    } catch (error: any) {
        console.error(`Error during user list retrieval: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default router