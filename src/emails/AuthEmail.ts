import { transporter } from "../config/nodemailer";
import dotenv from "dotenv"
dotenv.config();
interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (veterinary: IEmail) => {
    const info = await transporter.sendMail({
      from: "VETERINARIA_PET <admin@veterinaria_pet.com>",
      to: veterinary.email,
      subject: "Veterinaria - Pet Confirma tu cuenta",
      text: "Veteriaria - Pet Confirma tu cuenta",
      html: `<p>Hola: ${veterinary.name}, has creado una cuenta en VETERINARIA_PET, solo debes confirmar la cuenta</p>
            <p>Visita el siguiente enlace:</p>
            <a href='${process.env.FRONTEND_URL}/confirmar-cuenta'>Confirmar cuenta</a>
            <p>Ingresa el siguiente código:<b>${veterinary.token}</b></p>
            <p>Este token expira en 10 minutos</p>

            `,
    });
    console.log("Mensaje enviado",info.messageId);
    
  };
}
