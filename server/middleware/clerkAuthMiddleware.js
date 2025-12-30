import { createClerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const payload = await clerkClient.verifyToken(token);

    if (!payload) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Find or create user
    let user = await User.findOne({ clerkId: payload.sub });
    if (!user) {
      // Get user info from Clerk
      const clerkUser = await clerkClient.users.getUser(payload.sub);
      user = new User({
        clerkId: payload.sub,
        name: `${clerkUser.firstName} ${clerkUser.lastName}`,
        email: clerkUser.emailAddresses[0].emailAddress,
        avatar: clerkUser.imageUrl,
      });
      await user.save();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

export { protect };
