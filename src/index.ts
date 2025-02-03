import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import logger from "morgan";
import { ErrorMiddleware, TryCatch } from './middleware/error';
import ErrorHandler from './utils/ErrorHandler';
import path from 'path';
const app = express();
app.use(express.json()); // for parsing application/json 
app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(path.resolve(), 'public')));

app.post('/data', (req: Request, res: Response): void => {
     const data=req.body;
     console.log(data);
     res.header("mydata","aditya")
        res.json({
            message: 'Data received successfully',
        })
});
app.get('/about',TryCatch(
    async(req:Request,res:Response,
        next:NextFunction)=>{
            console.log(path.resolve())
           res.sendFile(path.join(path.resolve(), 'public', 'index.html'))
        }
    )
)

app.use(ErrorMiddleware);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
