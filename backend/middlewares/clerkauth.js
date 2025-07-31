import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config(); // Load the .env variables

export const clerkauth = ClerkExpressRequireAuth({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
  onError: (err, req, res, next) => {
    return res.status(401).json({ error: 'Unauthorized', message: err.message });
  },
});

export default clerkauth;
