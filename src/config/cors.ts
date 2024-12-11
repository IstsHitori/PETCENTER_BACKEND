import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {

    const whiteList = [process.env.FRONTEND_URL];
    console.log(origin)
    //el la segunda condición no iba
    if (process.argv[2] === "--api") {
      //aqui va undefined en el push
      whiteList.push("https://petcenter-frontend.vercel.app");
    }
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
    console.log(whiteList)
  },
};
