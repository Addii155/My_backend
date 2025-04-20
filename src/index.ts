import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import logger from "morgan";
import path from 'path';
import { ErrorMiddleware, TryCatch } from './middleware/error';
import ErrorHandler from './utils/ErrorHandler';
import  dotevn  from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotevn.config();


const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function run() {
    const model = genAI.getGenerativeModel({ model:"gemini-1.5-flash" });
  
    const prompt = "Explain black holes in simple terms.";
  
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
  
    console.log("Gemini Response:", text);
  }
  
  run().catch(console.error);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

app.post("/api/v1/user", (req: Request, res: Response) => {
    const data=req.body;  
    console.log(data);
    res.status(200).json({
        success:true,
        message:data
    })
})

app.use(ErrorMiddleware);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
