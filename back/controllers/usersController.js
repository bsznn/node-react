import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    // Permet de vérifier qu'il y a au moins une majuscule, une minuscule, un chiffre et un caractère spécial
    const checkPwd =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

    const { login, email, password } = req.body;

    if (login.trim() === "" || email.trim() === "" || password.trim() === "") {
      return res
        .status(400)
        .json({ message: "Veuillez remplir tous les champs" });
    }

    // Permet de savoir si l'utilisateur est déjà inscrit
    // email : req.body.email
    const verifEmail = await User.findOne({ email: email });

    if (verifEmail) {
      return res.status(401).json({ message: "Cet email est déjà enregistré" });
    }

    // Vérification du mot de passe respectant la regex
    //  req.body.password
    if (!checkPwd.test(password)) {
      return res.status(401).json({ message: "Mot de passe incorrecte" });
    }

    /*


    const newUser = new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    })
//  OU // 

    */

    const newUser = new User({
      login,
      email,
      password,
    });

    // IL VA EXECUTER LE HACHAGE DE MOT DE PASSE AVANT DE SAUVEGARDER EN BB
    // LE HOOK PRE SERA EXECUTE
    await newUser.save();

    res.status(200).json({ message: "Votre compte a bien été créé !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "La création de compte a échoué" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur trouvé avec cette adresse mail" });
    }

    // Je vais comparer le mot de passe inséré dans la req.body.password avec celui stocké en BDD
    const isValidPwd = bcrypt.compareSync(password, user.password);

    if (!isValidPwd) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Je vais créer mon token, si le MDP est correct
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_TOKEN }
    );

    res.status(200).json({
      id: user._id,
      login: user.login,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};
