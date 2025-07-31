import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth_routes.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT||3000;
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/webhook", express.raw({ type: "application/json" }), authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
