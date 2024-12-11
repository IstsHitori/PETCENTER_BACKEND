import type { Request, Response } from "express";
import Veterinary from "../models/Veterinary";
import { checkPassword, hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, userName } = req.body;
      //Prevenir duplicados
      const existVeterinary = await Veterinary.findOne({ userName });
      if (existVeterinary) {
        const error = new Error("El usuario ya está registrado");

        return res.status(409).json({ error: error.message });
      }
      const veterinary = new Veterinary(req.body);
      //Hash password
      veterinary.password = await hashPassword(password);
      //generar el token
      const token = new Token();
      token.token = generateToken();
      token.veterinary = veterinary.id;

      //Enviar el email
      AuthEmail.sendConfirmationEmail({
        email: "franciscojavierelpro@gmail.com",
        name: veterinary.name,
        token: token.token,
      });

      await Promise.allSettled([veterinary.save(), token.save()]);
      res.send(
        "Cuenta creada, contacta con el administrador para confirmar la cuenta"
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      const existToken = await Token.findOne({ token });
      if (!existToken) {
        const error = new Error("Token no válido");
        return res.status(401).json({ error: error.message });
      }

      const veterinary = await Veterinary.findById(existToken.veterinary);
      veterinary.confirm = true;
      await Promise.allSettled([veterinary.save(), existToken.deleteOne()]);

      res.send("Cuenta confirmada correctamente");
    } catch (error) {
      console.log(error.message);
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { userName, password } = req.body;
      const veterinary = await Veterinary.findOne({ userName });
      if (!veterinary) {
        const error = new Error("Veterinario no encontrado");
        return res.status(404).json({ error: error.message });
      }
      if (!veterinary.confirm) {
        const error = new Error("El veterinario no está confirmado");
        return res.status(404).json({ error: error.message });
      }
      //Revisar password

      const isPasswordCorrect = await checkPassword(
        password,
        veterinary.password
      );

      if (!isPasswordCorrect) {
        const error = new Error("Password incorrecto");
        return res.status(401).json({ error: error.message });
      }

      const token = generateJWT({ id: veterinary.id });
      res.send(token);
    } catch (error) {
      console.log("hubo un error");

      console.log(error.message);
    }
  };
  static updatePassword = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { password } = req.body;

      //Buscar el veterinario
      const veterinary = await Veterinary.findById(id);
      if (!veterinary) {
        const error = new Error("No se econtró el veterinario");
        return res.status(404).json({ error: error.message });
      }
      veterinary.password = await hashPassword(password);
      await veterinary.save();
      res.send("Se actualizó la contraseña");
    } catch (error) {
      console.log(error);
    }
  };

  static updateAccount = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const veterinary = await Veterinary.findById(id);
      const { password, name, userName } = req.body;
      if (!veterinary) {
        const error = new Error("Veterinario no encontrado");
        return res.status(404).json({ error: error.message });
      }
      veterinary.password = await hashPassword(password);
      veterinary.name = name;
      veterinary.userName = userName;
      await veterinary.save();
      res.send("Veterinario actualizado");
    } catch (error) {
      console.log(error);
    }
  };
  static getProfile = async (req: Request, res: Response) => {
    const veterinary = req.veterinary;
    if (!veterinary) {
      const error = new Error("Veterinario no encontrado");
      return res.status(401).json({ error: error.message });
    }

    res.json({
      name: veterinary.name,
      userName: veterinary.userName,
    });
  };
}
