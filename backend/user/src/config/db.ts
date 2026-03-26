import mongoose from 'mongoose';
const connectDb=async()=>{
    const URL=process.env.MONGO_URL;
    if(!URL){
        throw new Error("URL not found in the environment variable");
    }
    try {
        await mongoose.connect(URL,{
            dbName:"chatappmicroservices"
        })
        console.log("Connected to mongodb!!")
    } catch (error) {
        console.error("Error while connecting to database");
    }
}

export default connectDb;