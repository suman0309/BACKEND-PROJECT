// require('dotenv').congfig({path:'./env'})
import dotenv from "dotenv"
dotenv.config({
    path:'./env'
})

import connectDB from "./db/index.js"
import express from "express"


const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json())

// Routes (add later)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.log("Failed to start server:", err)
    process.exit(1)
  })  
















/*
import express from "express"
const app=express()
//()() ifes i.e () is declared and called instantly

(async ()=>{
try{

await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
app.on("error",(error)=>{
    console.log("ERR:",error)
    throw error
})


}
catch(err){
    console.log("ERROR:",err)
    throw err
}
})()
*/