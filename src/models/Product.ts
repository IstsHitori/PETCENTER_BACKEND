import mongoose, {Schema,Document,Types} from "mongoose";
export interface IProduct extends Document{
    name:string;
    price:number;
    brand:string;
    witght:string;
    quantity:number;
    isDeleted:boolean;
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
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    
});

ProductSchema.pre("find",function(){
    this.where({isDeleted:false})
})

ProductSchema.pre("findOne",function(){
    this.where({isDeleted:false})
})
export const Product = mongoose.model<IProduct>("Product",ProductSchema)