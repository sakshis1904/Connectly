import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({
      users: userId,
    })
    .populate('users', 'name avatar clerkId')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, participants, isGroup } = req.body;

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
    res.status(500).json({
      message: error.message,
    });
  }
};

