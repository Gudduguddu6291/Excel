import express from 'express';
import { Webhook } from 'svix';
import User from '../model/User.js';
const authRouter = express.Router();


authRouter.post('/', async (req, res) => {
  const { clerkUserId, email } = req.body;

  if (!clerkUserId || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ clerkUserId });

    if (!existingUser) {
      await User.create({
        clerkUserId,
        email,
        createdAt: new Date(),
      });
      console.log('✅ New user saved to DB');
    } else {
      console.log('ℹ️ User already exists');
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ DB Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});



export default authRouter;