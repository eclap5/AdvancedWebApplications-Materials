/**
 * This middleware function is used to validate the token sent by the client.
 * If the token is valid, the user property is added to the request object.
 * This middleware can be called from any route that requires authentication.
 * 
 * Validation can be also done with passport and passport-jwt libraries. This is more secure and recommended way.
 * Example of using passport-jwt: @link https://github.com/eclap5/AdvancedWebApplications/tree/main/Week9/src/middleware
 * 
 * Simple to script to generate a secret key: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */

import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// Custom request interface to include user property, otherwise error would occur when assigning user to req.user
interface CustomRequest extends Request {
    user?: JwtPayload
}

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header('authorization')?.split(' ')[1] // extract token from header
    if (!token) return res.status(401).json({ message: 'Access denied, missing token' })

    try {
        const verified: JwtPayload = jwt.verify(token, process.env.SECRET as string) as JwtPayload // this needs to be casted to JwtPayload
        req.user = verified
        next()
    } catch (error: any) {
        res.status(400).json({ message: 'Access denied, invalid token' })
    }
}
