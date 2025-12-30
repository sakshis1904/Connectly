import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  }catch (error) {
  console.error("🔥 MESSAGE CONTROLLER ERROR 🔥");
  console.error(error);
  console.error(error.message);
  console.error(error.stack);

  res.status(500).json({
    message: error.message,
  });
}


};

export const sendMessage = async (req, res) => {
  try {
    const userId = req.auth.userId; // ✅ Clerk
    const { chatId, content } = req.body;

    const message = await Message.create({
      sender: userId,
      chat: chatId,
      content,
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message._id,
    });

    res.status(201).json(message);
  } catch (error) {
  console.error("🔥 MESSAGE CONTROLLER ERROR 🔥");
  console.error(error);
  console.error(error.message);
  console.error(error.stack);

  res.status(500).json({
    message: error.message,
  });
}


};
