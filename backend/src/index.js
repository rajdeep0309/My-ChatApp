import connectDB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config({
  path: "./.env",
});
connectDB()
  .then(() => {
    console.log("MongoDB Connected");
    app.on("error", (err) => {
      console.log("Connection Error1: ", err);
      throw err;
    });
    const serv = app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    const io = new Server(serv, {
      cors: {
        origin: "*",
      },
      pingTimeout: 60000,
    });

    io.on("connection", (socket) => {
      socket.on("setup", (user) => {
        socket.join(user._id);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
      });
      
      socket.on("new message", (newMessageStatus) => {
        var chat = newMessageStatus.chat;
        if(!chat.users){
            return console.log("chat.users not defined")
        }
        chat.users.forEach((user) =>{
            if(user._id == newMessageStatus._id) return;
            socket.in(user._id).emit("message received", newMessageRecieved);
        })
      })

    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed: ", err);
    process.exit(1);
  });
