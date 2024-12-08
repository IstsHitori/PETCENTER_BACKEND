import { Request, Response } from "express";
import { Product } from "../models/Product";
import {
  PATIENT_ERRORS,
  PRODUCT_ERRORS,
  SERVICE_ERRORS,
} from "../utils/errors";
import { Service } from "../models/Service";
import Patient from "../models/Patient";

export class ServiceController {
  static orderService = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, price, days, product, type, state } = req.body;
      let service;
      const searchPatient = await Patient.findById(id);

      // Validación del paciente
      if (!searchPatient) {
        const error = new Error(PATIENT_ERRORS.PATIENT_DOES_NOT_EXIST);
        return res.status(404).json({ msg: error.message });
      }

      // Validación y registro de un servicio de vacunación
      if (product) {
        const searchProduct = await Product.findById(product);
        if (!searchProduct) {
          const error = new Error(PRODUCT_ERRORS.PRODUCT_DOESNT_EXIST);
          return res.status(404).json({ msg: error.message });
        }

        if (!searchPatient.hasVaccine) {
          const error = new Error(SERVICE_ERRORS.PATIENT_NOT_TO_VACCINATE);
          return res.status(402).json({ msg: error.message });
        }

        service = new Service({
          name,
          price,
          product,
          patient: id,
          state,
        });
        await service.save();
        return res.send("Se ha registrado el servicio");
      }

      // Validación y registro de un servicio de hospitalización
      else if (days) {
        service = new Service({
          name,
          price,
          days,
          patient: id,
          type,
          state,
        });
        await service.save();
        return res.send("Se ha registrado el servicio");
      }

      // Registro de otros servicios (baño o peluquería)
      service = new Service({ name, price, patient: id, state });
      await service.save();
      return res.send("Se ha registrado el servicio");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  };

  static getAllServices = async (req: Request, res: Response) => {
    try {
      const arrayServices = await Service.find()
        .populate("product", "name")
        .populate("patient", "name propietor");
      return res.json({ services: arrayServices });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error al obtener los servicios" });
    }
  };

  static deleteService = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const searchService = await Service.findById(id);
      if (!searchService) {
        const error = new Error(SERVICE_ERRORS.ID_NOT_VALID);
        return res.status(404).json({ msg: error.message });
      }

      await searchService.deleteOne({ _id: id });
      return res.send("Se ha eliminado el servicio");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error al eliminar el servicio" });
    }
  };
  static patchService = async (req:Request,res:Response) => {
    try{
     const {id} = req.params;
     const {state} = req.body;
     
     const searchService = await Service.findById(id);
     if(!searchService){
        const error = new Error(SERVICE_ERRORS.SERVICE_NOT_FOUND);
        return res.status(404).json({msg:error.message});
     }
     searchService.state = state;
     await searchService.save();
     res.send("Se ha cambiado el estado del servicio");
    }catch(error){
      console.log(error);
    }
  }
}
