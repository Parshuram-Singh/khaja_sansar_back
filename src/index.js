import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDb } from "./db/db.js";
import subscriptionRoutes from "./routes/subscription.routes.js";

const app = express();
dotenv.config({ path: "./.env" });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", subscriptionRoutes);
app.get("/", (req, res) => {
    res.send("I am here");
});

// MongoDB Connection
connectDb()
.then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`successfully listen on ${process.env.PORT}`);
  })
})
.catch((error) => {
  console.log("MONGODB connection failed !! " , error)
});


