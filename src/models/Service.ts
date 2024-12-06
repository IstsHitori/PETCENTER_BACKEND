import { Document, Schema } from "mongoose";
import mongoose from "mongoose";

export interface IService {
    name:string;
    price:number;
}