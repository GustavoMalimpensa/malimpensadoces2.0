import multer from "multer";
import path from "path";

function configureMulter() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Define o diretório de destino para salvar os arquivos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + path.extname(file.originalname)); // Define o nome do arquivo (pode ser personalizado)
      
    },
  });

  const upload = multer({ storage: storage });

  return upload;
}

export default configureMulter;
