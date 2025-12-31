import { Server } from "socket.io";
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`Joined chat ${chatId}`);
    });

    socket.on("leaveChat", (chatId) => {
      socket.leave(chatId);
      console.log(`Left chat ${chatId}`);
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { chatId, content, type, mediaUrl, fileName } = data;

        const message = await Message.create({
          chat: chatId,
          content,
          type,
          mediaUrl,
          fileName,
        });

        await Chat.findByIdAndUpdate(chatId, {
          lastMessage: message._id,
        });

        io.to(chatId).emit("receive_message", message);
      } catch (err) {
        console.error("Socket message error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

export default setupSocket;
