import type { Request, Response } from "express";
import Veterinary from "../models/Veterinary";
export class VeterinaryController {
  static getAllVeterinary = async (req: Request, res: Response) => {
    try {
      const veterinaries = await Veterinary.find({});
      res.json(veterinaries);
    } catch (error) {
      console.log(error);
    }
  };

  static getVeterinaryByUserName = async (req: Request, res: Response) => {
    const { userName } = req.params;
    try {
      const veterinary = await Veterinary.findOne({ userName });
      if (!veterinary) {
        const error = new Error("Veterinario no encontrado");
        return res.status(404).json({ error: error.message });
      }
      res.json(veterinary);
    } catch (error) {
      console.log(error);
    }
  };

  static deleteVeterinaryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const veterinarie = await Veterinary.findByIdAndDelete(id);
      if (!veterinarie) {
        const error = new Error("Veterinario no encontrado");
        return res.status(404).json({ error: error.message });
      }
      res.send("Veterinario eliminado");
    } catch (error) {
      console.log(error);
    }
  };
}
