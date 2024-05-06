/**
 * @file User.ts
 * 
 * This file needs to be modified to include the GoogleId field in the User schema and in the IUser interface.
 * 
 * Change password as optional field in the User schema and in the IUser interface.
 * Add googleId field as optional in the User schema and in the IUser interface.
 */

import mongoose, { Document, Schema } from 'mongoose'

interface IUser extends Document {
    username: string
    password?: string
    googleId?: string
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    googleId: { type: String, required: false }
})

const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', UserSchema)

export { User, IUser }