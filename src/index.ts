import express , {Express} from 'express'
import cors from 'cors'
import {  connectDB } from './db/index.js'
import { router as userRouter} from './routes/user.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT  = process.env.PORT || 8080
connectDB()

const app : Express= express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/', userRouter)

app.listen(PORT ,()=>{
    console.log("Server running on port "+PORT)
})
