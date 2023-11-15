import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dataRoute from "./routes/dataRoute.js"
dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://arunpathivada143:arun123@cluster0.ikmxzrg.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


  //routes
  app.use("/api/data/",dataRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
