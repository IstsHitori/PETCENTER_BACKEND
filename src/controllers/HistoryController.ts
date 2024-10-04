import { History } from "../models/History";
import Patient from "../models/Patient";
import { Request, Response } from "express";
export class HistoryController {
  static createHistory = async (req: Request, res: Response) => {
    const { patient } = req.body;

    try {
      const searchPatient = Patient.findById(patient);
      if (!searchPatient) {
        const error = new Error("Este paciente no existe");
        return res.status(401).json({ error: error.message });
      }
      const history = new History(req.body);
      await history.save();
      res.send("Historia creada");
    } catch (error) {
      console.log(error);
    }
  };
  static getAllHistories = async (req: Request, res: Response) => {
    try {
      const histories = await History.find();
      return res.json({ histories });
    } catch (error) {
      console.log(error);
    }
  };
  static getHistoriesPatient = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const searchPatient = Patient.findById(id);
      if (!searchPatient) {
        const error = new Error("Este paciente no existe");
        return res.status(401).json({ error: error.message });
      }
      const patientHistories = await History.find()
        .where("patient")
        .equals(id);
      res.json({ patientHistories });
    } catch (error) {
      console.log(error);
    }
  };

  static deleteHistory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const searchHistory = await History.findById(id);
      if (!searchHistory) {
        const error = new Error("No se encontró la historia");
        return res.status(401).json({ error: error.message });
      }
      await History.deleteOne();
      res.send("Se ha eliminado la historia");
    } catch (error) {
      console.log(error);
    }
  };
}
