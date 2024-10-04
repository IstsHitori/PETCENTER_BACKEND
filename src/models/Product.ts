import mongoose, {Schema,Document,Types} from "mongoose";
export interface IProduct{
    name:string;
    price:number;
    brand:string;
    witght:string;
    category:Types.ObjectId
}


