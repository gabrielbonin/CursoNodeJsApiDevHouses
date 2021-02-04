import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      // manipular imagem
      const ext = path.extname(file.originalname); // extensao da img
      const name = path.basename(file.originalname, ext); // nome da img
      callback(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};

// config para upload de imagens
// guardar imagens num determinado destination
