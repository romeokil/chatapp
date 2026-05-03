import express from 'express';
import dotenv from 'dotenv'
import { startsendOtpConsumer } from './consumer.js';
dotenv.config();

startsendOtpConsumer();
const app= express();

const PORT=process.env.PORT ;
app.listen(PORT,()=>{
    console.log(`Mail Server is running at ${PORT}`)
})


