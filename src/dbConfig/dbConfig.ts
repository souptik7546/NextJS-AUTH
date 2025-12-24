import mongoose from "mongoose";

export async function connectDB() {
    try {
        const connectionInstance= await mongoose.connect(process.env.MONGODB_URI!) //since we are using typescrypt there is no garuntee that the link wll always work so we are using ! to let the script know that i will take care of it
        console.log("mongodb connection instace", connectionInstance?.connection.host);
        
        connectionInstance.connection.on("connected",()=>{
            console.log("MongoDb connected Successfully");
            
        })
        
    } catch (error) {
        console.log("Error while connecting to database,",error)
    }
}