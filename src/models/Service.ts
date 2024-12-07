import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";

interface IService extends Document {
    name:string;
    price:number;
    days?:number;
    product?:Types.ObjectId;
    patient:Types.ObjectId;
    type?:String;
    date:Date
}

const ServiceSchema : Schema = new Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    days:{
        type:Number,
    },
    product:{
        type:Types.ObjectId,
        ref:"Product"
    },
    patient:{
        type:Types.ObjectId,
        ref:"Patient"
    },
    type:{
        type:String,
    },
    date:{
        type:Date,
        default:function(){
            return Date();
        }
    }
});

export const Service = mongoose.model<IService>("Service",ServiceSchema);