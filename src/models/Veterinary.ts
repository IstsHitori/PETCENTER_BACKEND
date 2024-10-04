import mongoose, { Schema, Document } from "mongoose";

export interface IVeterinary extends Document {
  name: string;
  userName: string;
  password: string;
  confirm: boolean;
};

const VeterinarySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName:{
    type:String,
    required:true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  confirm: {
    type: Boolean,
    default:false
  },
});

const Veterinary = mongoose.model<IVeterinary>("Veterinary", VeterinarySchema);

export default Veterinary;
