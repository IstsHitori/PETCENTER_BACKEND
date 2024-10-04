import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  name: string;
  propietor: string;
  docPropietor: string;
  telephone: string;
  date: Date;
  state: boolean;
  symptoms: string;
  size: string;
  typePet: string;
  hasVaccine: boolean;
}

const PatientSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    propietor: {
      type: String,
      required: true,
    },
    docPropietor: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    state: {
      type: Boolean,
      default: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    typePet: {
      type: String,
      required: true,
    },
    hasVaccine: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model<IPatient>("Patient", PatientSchema);

export default Patient;
