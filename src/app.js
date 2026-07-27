import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "100kb"}))     //ye limit islie lagayi h taki agar user ne jyada data bheja to server crash na ho jaye , ye security ke liye bhi h.

app.use(express.urlencoded({extended: true, limit:"100kb"}))   //ye islie use kia bcz jab hmm url use krte h to usme jo + ya %20 a jata h use htane k liye, extended ka use bs object k ander object de paye islie krte h

app.use(express.static("public"))     //ye koi image a gyi ya pdf a gyi to use store krne k liye h , public name ki jo file banayi h hmne usme store ho jayega

app.use(cookieParser())   //ye islie use kia h taki cookie ko read kr ske , ye middleware h jo hmne express me use kia h.

//routes

import userRouter from "./routes/user.routes.js"

//routes declaration : phele app.get ham use kr pa rhe the bcz hm routes aur controller ek hi jagah pr likh rhe the lekin ab hmne routes alag declare kiye h to hme app.use (middleware)use krna padega

app.use("/api/v1/users", userRouter)      //ye api aur vewrsion 1 likhna acchi practice h islie likha h

export default app
 
 