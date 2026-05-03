import express from "express";
import dotenv from 'dotenv'
import connectDb from "./config/db.js";
import { createClient } from "redis";
import UserRoutes from './routes/User.js'
import { connectRabbitMQ } from "./config/rabbitmq.js";
dotenv.config();

connectDb();
connectRabbitMQ();

export const Redisclient=createClient({
    url: process.env.REDIS_URL,
})

Redisclient.connect().then(()=>console.log("Connected to redis")).catch((error)=>console.log(error));

// console.log(process.env.REDIS_URL);
const app=express();
app.use(express.json());

app.use('/api/v1',UserRoutes);

const PORT=process.env.PORT;


app.listen(PORT,()=>{
    console.log(`User Server is running at ${PORT}`);
})