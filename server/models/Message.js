import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String, // ✅ CLERK USER ID
      required: true,
    },

    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },

    content: { type: String },
    type: { type: String, default: "text" },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
