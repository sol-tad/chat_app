import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";


dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT;
app.use(express.json());//req.body
app.use(cookieParser());//req.cookie
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make read for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
