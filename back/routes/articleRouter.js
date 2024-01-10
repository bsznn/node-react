import express from "express";
import {
  addArticle,
  addComment,
  getAllArticles,
  getOneArticle,
} from "../controllers/articlesController.js";
import upload from "../middlewares/multer.js";
import { isAuthorized, isLogged } from "../middlewares/auth.js";

const articleRouter = express.Router();

articleRouter.get("/articles", getAllArticles);

// Créer une route dynamique pour récupérer un seul article
articleRouter.get("/articles/:id", getOneArticle);

// si plusieurs images, à la place single mettre array
articleRouter.post(
  "/articles/new",
  isLogged,
  isAuthorized(["admin", "user"]),
  upload.single("image"),
  addArticle
);

articleRouter.put("/articles/:articleId/new-comment", isLogged, addComment);

export default articleRouter;
