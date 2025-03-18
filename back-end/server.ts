import express, { Request, Response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

dotenv.config();
const app = express();
const prisma = new PrismaClient().$extends(withAccelerate());
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

prisma.$connect()
.then(() => console.log("Connected to DB"))
.catch(err => console.error("DB Connection Error:", err));

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
    const [products, store] = await Promise.all([
      prisma.frontPageProducts.findMany({
        cacheStrategy: {
          ttl: 60 * 2, // serve from cache for 5 minutes
          swr: 60 * 1, // serve from cache for 2 more minutes and revalidate in the background
        },
      }),
      prisma.storeContent.findMany({
        cacheStrategy: {
          ttl: 60 * 2, // serve from cache for 5 minutes
          swr: 60 * 1, // serve from cache for 2 more minutes and revalidate in the background
        },
      }),
    ]);
    res.status(200).json({products, store});
  } catch (err) {
    res.status(500).json({err: "SERVER/DB ERROR"});
  }
});