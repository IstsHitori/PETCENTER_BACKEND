import { IPatient } from "../models/Patient";

export const formatUpdatePatient = async (
  object: IPatient,
  patient: IPatient
) => {
  patient.name = object.name || patient.name;
  patient.propietor = object.propietor || patient.propietor;
  patient.docPropietor = object.docPropietor || patient.docPropietor;
  patient.telephone = object.telephone || patient.telephone;
  patient.state = object.state;
  patient.symptoms = object.symptoms || patient.symptoms;
  patient.size = object.size || patient.size;
  patient.typePet = object.typePet || patient.typePet;
  patient.hasVaccine = object.hasVaccine;

  return patient;
};
