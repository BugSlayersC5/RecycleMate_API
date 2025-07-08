import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import 'dotenv/config'
import { userRouter } from "./routes/user_routes.js"




const app = express()

const PORT = process.env.PORT || 9898
app.use(cors())
app.use(express.json());


app.use('/api/v1/users', userRouter)


const mongoURI = process.env.MONGO_URI;


await mongoose.connect(mongoURI);

app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`)
})