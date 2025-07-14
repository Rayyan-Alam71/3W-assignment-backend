import express from 'express'
import cors from 'cors'
import {  connectDB } from './db/index.js'
import { User } from './db/models.js'
import { router as userRouter} from './routes/user.js'

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/', userRouter)

app.listen(3000 ,()=>{
    console.log("Server running on port 3000")
})
