import express from 'express';
import { Webhook } from 'svix';
import User from '../model/User.js';
const authRouter = express.Router();


authRouter.post('/', async (req, res) => {
  console.log("✅ Webhook endpoint hit");
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  const payload = req.body; // raw body
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(payload, headers); // Verify signature
  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return res.status(400).send('Invalid webhook signature');
  }

  const { type, data } = evt;

  if (type === 'user.created') {
    const clerkUserId = data.id;
    const email = data.email_addresses?.[0]?.email_address;

    await User.create({
      clerkUserId,
      email,
      createdAt: new Date(),
    });

    return res.status(200).send("✅ User created and saved to DB");
  }

  res.status(200).send();
});

export default authRouter;