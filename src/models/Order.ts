import { Document, Schema, Types } from "mongoose";
import { IProduct } from "./Product";
import { IOrder_Items } from "./OrderItems";

export interface IOrder extends Document{
    nameClient:String;
    nit:Number;
    date:Date;
    address:String;
    telephone:String;
    items:Types.Array<IOrder_Items>;
    total_amount:Number;
}

const OrderSchema:Schema = new Schema({
    nameClient:{
        type:String,
        required:true
    },
    nit:{
        type:Number,
        required:true
    },
    total_amount:{
        type:Number,
  
    }
});