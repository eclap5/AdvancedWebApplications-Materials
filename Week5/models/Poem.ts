import mongoose, { Document, Schema } from 'mongoose'

interface IPoem extends Document {
    poem: string
    vip: boolean
    date: Date
}

let poemSchema: Schema = new Schema({
    poem: {type: String, required: true},
    vip: {type: Boolean, required: true},
    date: {type: Date, required: true}
})

// Create a model using the schema
const Poem = mongoose.model<IPoem>('Poem', poemSchema)

// Export the model and the interface to be used in other files
export { Poem, IPoem }