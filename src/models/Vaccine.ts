import mongoose,{Schema,Document,Types} from "mongoose";

export interface IVaccine{
   patient:Types.ObjectId;
   product:Types.ObjectId;
   date:Date;
   vaccinated:boolean;
}