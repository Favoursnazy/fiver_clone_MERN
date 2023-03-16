import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import conversationRoute from "./routes/conversation.route.js";
import orderRoute from "./routes/order.route.js";
import gigRoute from "./routes/gig.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";

//Init App
const app = express();

//Connecting our app to mongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
};

//using cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

//using express midlleware
app.use(express.json());

//cookie parser
app.use(cookieParser());

//Express Routes
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/auth", authRoute);

//error handlers
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMesage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMesage);
});

//Listen to our port
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`App has started and its running on PORT ${process.env.PORT}`);
});
