import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Veterinary, { IVeterinary } from "../models/Veterinary";

declare global {
    namespace Express{
        interface Request {
            veterinary?:IVeterinary
        }
    }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error("No autorizado");
    return res.status(401).json({ error: error.message });
  }
  const token = bearer.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && decoded.id) {
      const veterinary = await Veterinary.findById(decoded.id).select('_id name userName');
      if (!veterinary) {
        res.status(500).json({ error: "Token no valido" });
      }
      req.veterinary = veterinary;
    }
  } catch (error) {
    res.status(500).json({ error: "Token no valido" });
  }
  next();
};
