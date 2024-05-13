
import connectDB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";


dotenv.config(
    {
        path: "./.env"
    }
);



connectDB()
.then(()=>{
    console.log("MongoDB Connected")
    app.on("error",(err)=>{
        console.log("Connection Error1: ",err)
        throw err;
    })
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB Connection Failed: ",err)
    process.exit(1);
})

