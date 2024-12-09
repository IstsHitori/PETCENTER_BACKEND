import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer {
  name: String;
  nit: Number;
  address: String;
  telephone: String;
}

const CustomerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nit: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
});

export const Customer = mongoose.model<ICustomer>("Customer",CustomerSchema);
