import { Request, Response, Router } from 'express'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User, IUser } from '../models/User'
import { validateToken } from '../middleware/validateToken'

const router: Router = Router()

interface IPoem {
    id: number
    poem: string
    vip: boolean
}

router.post('/api/users/register', async (req: Request, res: Response) => {
    try {
        const existingUser: IUser | null = await User.findOne({ username: req.body.username })
        if (existingUser) {
            return res.status(403).json({ username: 'username already in use.' })
        }
        
        const salt: string = bcrypt.genSaltSync(10)
        const hash: string = bcrypt.hashSync(req.body.password, salt)

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

router.post('/api/users/login', async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findOne({ username: req.body.username })
        console.log(user)
        if (!user) {
            return res.status(403).json({ message: 'Login failed' })
        }
        
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const jwtPayload: JwtPayload = {
                id: user._id,
                username: user.username
            }
            const token: string = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, { expiresIn: '30m' })
            return res.status(200).json({ success: true, token })
        }
        return res.status(401).json({ message:'Invalid password' })
    } catch (error: any) {
        console.error(`Error during user login: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

// This route is protected by the validateToken middleware
// Send poems to client if user is signed in
// These could be also stored in database and queried from there
router.get('/api/poems', validateToken, async (req: Request, res: Response) => {
    try {
        const poems: IPoem[] = [
            {
                "id": 1,
                "poem": "Nunc tempus eros id venenatis sagittis. Nam ac sagittis elit. Aenean ac eleifend metus, eget tincidunt odio.",
                "vip": true
            },
            {
                "id": 2,
                "poem": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit libero sed mi euismod dapibus. Nullam eu molestie libero, eget interdum massa.",
                "vip": false
            },
            {
                "id": 3,
                "poem": "Suspendisse efficitur tellus id blandit vestibulum. Etiam condimentum dolor velit, in fermentum ligula ultricies et.",
                "vip": false
            }
        ]

        return res.status(200).json(poems)

    } catch (error: any) {
        console.error(`Error during poem retrieval: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default router