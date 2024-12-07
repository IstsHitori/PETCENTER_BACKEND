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
      const { name, price, days, product } = req.body;
      let service;
      const searchPatient = await Patient.findById(id);
      if (!searchPatient) {
        const error = new Error(PATIENT_ERRORS.PATIENT_DOES_NOT_EXIST);
        return res.status(404).json({ msg: error.message });
      }
      //Cuando hay un servicio de vacunación
      if (product) {
        const searchProduct = await Product.findById(product);
        if (!searchProduct) {
          const error = new Error(PRODUCT_ERRORS.PRODUCT_DOESNT_EXIST);
          return res.status(404).json({ msg: error.message });
        }
        if(!searchPatient.hasVaccine){
            const error = new Error(SERVICE_ERRORS.PATIENT_NOT_TO_VACCINATE);
            return res.status(402).json({msg:error.message});
        }
        console.log("Producto");
        service = new Service({ name, price, product, patient: id });
        await service.save();
        return res.send("Se ha registrado el servicio");
      }
      //Cuando hay un servicio de hospitalización
      if (days) {
        console.log("days", req.body);
        service = new Service({ name, price, days, patient: id });
        await service.save();
        return res.send("Se ha registrado el servicio");
      }
      //Cuando hay un servicio de baño o peluqueria
      service = new Service({ name, price, patient: id });
      console.log("al final", req.body);
      await service.save();
      return res.send("Se ha registrado el servicio");
    } catch (error) {
      console.log(error);
    }
  };
  static getAllServices = async (req: Request, res: Response) => {
    try {
      const arrayServices = await Service.find();
      return res.json({ services: arrayServices });
    } catch (error) {}
  };
  static deleteService = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const searchService = await Service.findById(id);
      if (!searchService) {
        const error = new Error(SERVICE_ERRORS.ID_NOT_VALID);
        return res.json({ msg: error.message });
      }
      await searchService.deleteOne({ _id: id });
      res.send("Se ha eliminado el servicio");
    } catch (error) {
      console.log(error);
    }
  };
}
