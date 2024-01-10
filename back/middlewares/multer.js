// CONFIGURATION DE LA GESTION DES IMAGES

import multer from "multer"; // pour insérer des images
import path from "path"; // tout ce qui gère les chemins

const maxSize = 5242880; // Environ 5 MO

const storageEngine = multer.diskStorage({
  destination: "./public/assets/img",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.split(" ").join("_")}`);
  },
});

const upload = multer({
  storage: storageEngine,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

/**
 *
 * @param {*} file
 * @param {*} cb
 * @returns
 * Fonction qui retourne et qui va vérifier le type des fichiers autorisés
 */
const checkFileType = (file, cb) => {
  // Autorisation des fichiers img

  const fileTypes = /jpg|png|jpeg|gif|webp|svg/;

  // Vérification des extensions de fichiers
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  /* 
  path.extname : pour récupérer une image dispo en local dans le dossier public
  file.mimetype : pour récupérer l'image que l'utilisateur nous envoie (à partir du front)
  */

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb("Format de fichier non supporté");
  }
};

export default upload;
