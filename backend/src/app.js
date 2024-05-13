import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {DATA_LIMIT} from "./constants.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
//configuring the express to accept the json data
//accepting json data and limit the size of the data
app.use(
  express.json({
    limit: DATA_LIMIT,
  })
);
//accepting urlencoded data and limit the size of the data
app.use(
  express.urlencoded({
    extended: true,
    limit: DATA_LIMIT,
  })
);
//accepting static files
app.use(express.static("public"));
//accepting cookies
app.use(cookieParser());
// app.use(cookieParser({
//     // secure:true,
//     // sameSite:'strict'
// }));

//routes
import userRouter from "./routes/user.route.js";

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("API is running....");
});

export default app;
