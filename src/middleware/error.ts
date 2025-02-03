import { contollerType } from "../types/Type";
import { NextFunction , Request , Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const TryCatch=
    (controller:contollerType)=>
        async (req:Request , res:Response , next:NextFunction)=>{
            try{
                await controller(req,res,next);
            }
            catch(err){
                next(err);
            }
        };

export const ErrorMiddleware=(
    err:ErrorHandler,
    req:Request,
    res:Response,
    next:NextFunction,
)=>{
    err.message=err.message || "Internal Server Error";
    err.statusCode=err.statusCode || 500;
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}