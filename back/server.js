import express from "express"; // Import avec les ESModule
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import articleRouter from "./routes/articleRouter.js";
import cors from "cors";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express(); // créer l'application express
// Pour récupérer le req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Céer une route statique
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

dotenv.config();

connectDB();

app.use(articleRouter);
app.use(productRouter);
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Le serveur est exécuté à : ${process.env.BASE_URL}`);
});
