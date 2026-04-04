import express from "express";
import dotenv from 'dotenv'
import connectDb from "./config/db.js";
import { createClient } from "redis";
import UserRoutes from './routes/User.js'
dotenv.config();

connectDb();

export const Redisclient=createClient({
    url: process.env.REDIS_URL,
})

Redisclient.connect().then(()=>console.log("Connected to redis")).catch((error)=>console.log(error));

console.log(process.env.REDIS_URL);
const app=express();
app.use('/api/v1',UserRoutes);
const PORT=process.env.PORT;


app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})