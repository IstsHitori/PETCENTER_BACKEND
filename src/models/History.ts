import mongoose, { Schema, Document, Types } from "mongoose";

export interface IHistory extends Document {
  patient: Types.ObjectId;
  history: string;
  date: Date;
}

const HistorySchema: Schema = new Schema({
  patient: {
    type: Types.ObjectId,
    required: true,
  },
  history: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const History = mongoose.model<IHistory>("Histories", HistorySchema);
