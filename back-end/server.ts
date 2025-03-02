import express, { Request, Response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
prisma.$connect().then(() => console.log("Connected to DB")).catch(err => console.error("DB Connection Error:", err));

app.use(cors({
    origin: process.env.LOCAL_URL || process.env.VERCEL_URL,
    credentials: true,
  }));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
  });

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.frontPageProducts.findMany();
    const store = await prisma.storeContent.findMany();
    
    res.status(200).json({products, store});
  } catch (err) {
    res.status(500).json({err: "SERVER/DB ERROR"});
  }
})

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
  } catch {
    res.status(500).json({err: "SERVER/DB ERROR"});
  }
})