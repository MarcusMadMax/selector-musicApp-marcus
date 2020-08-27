const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure 
const ArtistSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    photo: String,
    type_id: String
  },
  { timestamps: true }
)

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Artist', ArtistSchema)