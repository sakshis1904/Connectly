import Chat from "../models/Chat.js";

// GET /api/chats
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Our middleware

    const chats = await Chat.find({
      users: userId,
    })
    .populate('users', 'name avatar clerkId')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
  console.error("🔥 CHAT CONTROLLER ERROR 🔥");
  console.error(error);              // FULL ERROR OBJECT
  console.error(error.message);      // MESSAGE
  console.error(error.stack);        // STACK TRACE

  res.status(500).json({
    message: error.message,
  });
}


};

// POST /api/chats
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Our middleware
    const { name, participants, isGroup } = req.body;

    // Convert clerkIds to MongoDB _ids
    const participantUsers = await User.find({ clerkId: { $in: participants } });
    const participantIds = participantUsers.map(user => user._id);

    const users = [...new Set([userId, ...participantIds])];

    const chat = await Chat.create({
      chatName: isGroup ? name : "Private Chat",
      users,
      isGroupChat: isGroup,
    });

    res.status(201).json(chat);
  } catch (error) {
  console.error("🔥 CHAT CONTROLLER ERROR 🔥");
  console.error(error);              // FULL ERROR OBJECT
  console.error(error.message);      // MESSAGE
  console.error(error.stack);        // STACK TRACE

  res.status(500).json({
    message: error.message,
  });
}



};
