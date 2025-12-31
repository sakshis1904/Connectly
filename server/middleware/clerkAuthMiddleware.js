import { requireAuth, clerkClient } from "@clerk/express";
import User from "../models/User.js";

export const protect = [
  requireAuth(),
  async (req, res, next) => {
    try {
      console.log("AUTH:", req.auth); 

      const clerkUserId = req.auth.userId;

      let user = await User.findOne({ clerkId: clerkUserId });

      if (!user) {
        const clerkUser = await clerkClient.users.getUser(clerkUserId);

        user = await User.create({
          clerkId: clerkUserId,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`,
          email: clerkUser.emailAddresses[0].emailAddress,
          avatar: clerkUser.imageUrl,
        });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Auth error:", err);
      return res.status(401).json({ message: "Authentication failed" });
    }
  },
];
