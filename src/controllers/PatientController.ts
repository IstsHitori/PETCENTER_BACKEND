import { Request, Response } from "express";
import Patient, { IPatient } from "../models/Patient";
import { formatUpdatePatient } from "../utils/patient";

export class PatientController {
  static createPatient = async (req: Request, res: Response) => {
    try {
      const patient = new Patient(req.body);

      await patient.save();
      res.send("Se ha registrado el paciente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllPatients = async (req: Request, res: Response) => {
    try {
      const patients = await Patient.find();

      res.json({ patients });
    } catch (error) {
      console.log(error);
    }
  };
  static getPatientByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.params;

      const patients = await Patient.find({ name });

      res.json({ patients });
    } catch (error) {
      console.log(error);
    }
  };
  static getPatientById = async (req:Request,res:Response) => {
    try{
      const {id} = req.params;
      const searchPatient = await Patient.findById(id);
      if(!searchPatient){
        const error = new Error("No se encontró el paciente");
        return res.status(404).json({error:error.message});
      }
      return res.json(searchPatient);
    }catch(error){
      console.log(error);
    }
  }
  static updatePatientByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
      const {
        name,
        propietor,
        telephone,
        state,
        symptoms,
        typePet,
        docPropietor,
        size,
        hasVaccine,
      } = req.body;
    console.log(req.body);

      const patient = await Patient.findById(id);
      if (!patient) {
        const error = new Error("No se encontró el paciente");
        return res.status(401).json({ error: error.message });
      }
      const object = {
        name,
        propietor,
        telephone,
        state,
        symptoms,
        typePet,
        docPropietor,
        size,
        hasVaccine,
      };

      const patientFormated = await formatUpdatePatient(
        object as IPatient,
        patient
      );
      await patientFormated.save();

      res.send("Paciente actualizado");
    } catch (error) {
      console.log(error);
    }
  };
  static deletePatientByID = async (req:Request, res:Response) => {
    try{
      const {id} = req.params;

      const patient = Patient.findById(id);
      if(!patient){
        const error = new Error("No se encontró el paciente");
        return res.status(401).json({error:error.message});
      }
      await patient.deleteOne();
      res.send("Paciente eliminado");
      
    }catch(error){
      console.log(error);
      
    }
  }
}
