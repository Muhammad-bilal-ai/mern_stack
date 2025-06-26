import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/product.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow the app to accept json data in req.body
app.use("/api/products", router);
app.listen(5000, () => {
  connectDB();
  console.log("server started at https://localhost:" + PORT);
});
