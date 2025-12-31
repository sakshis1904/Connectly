import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import setupSocket from "./socket/socket.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

// 🔥 REQUIRED FOR CLERK
app.use(clerkMiddleware());

const io = setupSocket(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

app.use(errorHandler);
