// //require('dotenv').config({path: './env'})    /*ye tarika thoda code ko old style dikhata h islie hmm naya tarika use krte h
// import mongoose from "mongoose";
// import{DB_NAME} from "./constants";
import dotenv from "dotenv"
import connectDB from "./db/index.js";  //ye file me agr js na likhta to bhi chal jata lekin kabhi kabhi error de deta h islie extension bhi likh dena

dotenv.config({
    path: './env'
})
// /*ab ye jo import krke le aye dot env ye ese ata nhi h , islie hmne iska experimental version use kia , package.json me jake dev wale me hmne iska experimental feature download kr lia */


connectDB()

//(ye h first approch database connect krne ki)

/*
import express from "express";
const app = express()

;(async () => {
    try{                                    //always use try catch
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("app is not connected",error);
            throw error   //ye express hmne islie download kia bcz kabhi kabhi database to connect ho jata h but jo express app h wo connect nhi ho pati to uske liye ye appon function error dikha dega.

            app.listen(process.env.PORT, () => {
                console.log(`app is listening on the port ${process.env.PORT}`);
                
            })
            
        })
    }
    catch(error){
        console.log("Error : ",error)
        throw err
    }
})()
*/          

//ye hmne IIFE lagaya bcz hmara function tabhi execute ho jaye. ; ye islie lgaya taki error na aye kyunki ho skta h user na pichle syntax k end me na lagaya ho(professional approach) . async await islie bcz database connect hone me time lgta h.



//second approach mene db ke index.js me likhi h !!