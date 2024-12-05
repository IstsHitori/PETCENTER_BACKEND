import mongoose, {Schema,Document,Types} from "mongoose";
export interface IProduct extends Document{
    name:string;
    price:number;
    brand:string;
    witght:string;
    quantity:number;
    category:Types.ObjectId
}

const ProductSchema: Schema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    witght:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    category:{
        type:Types.ObjectId,
        required:true,
        ref:"Category"
    }
});

export const Product = mongoose.model<IProduct>("Product",ProductSchema)