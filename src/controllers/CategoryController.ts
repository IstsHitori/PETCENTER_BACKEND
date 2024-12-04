import { Request,Response } from "express";
import Category from "../models/Category";

export class CategoryController{
    static createCategory = async(req:Request,res:Response) => {
        try{
            const {name,description} = req.body;
            
        }catch(error){
            console.log(error);
        }
    }
    
    static getAllCategories = async(req:Request,res:Response) => {

    }
}