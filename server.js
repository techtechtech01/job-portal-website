import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import path from "path";

dotenv.config(
    {
        path: "./.env"
    }
);

//--------------code for deployment----------------
if (process.env.NODE_ENV === "production") {
 const dirpath = path.resolve();
 app.use(express.static('./frontend/dist'));
 app.get('*splat', (req, res) => {
   res.sendFile(path.resolve(dirpath, './frontend/dist', 'index.html'));
 });
   
}
const startServer = async () => {
  try {
           
           await connectDB();

        app.on("error", (error) => {    // to check if there are any errors 
        console.log("ERROR", error);
        throw error;
    });


    app.listen(process.env.PORT || 8000, () => {   // app will listen
        console.log(` Server is running at port :     
            ${process.env.PORT}`);                 

    });
} catch (err) {
    console.log("MONGO db connection failed !!! ", err);
    
}
}

startServer();
