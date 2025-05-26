import cors from 'cors';
import Express from 'express';
import handleRoutesUser from "./routes/handleRoutesUser";
import handleRoutesProduct from "./routes/handleRoutesProduct";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Extraer extensión del nombre original
    const originalExt = path.extname(file.originalname) || '.jpg';
    // Generar nombre único con UUID y extensión
    const uniqueName = `img_${uuidv4()}${originalExt}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    // Forzar extensión .jpg si no la tiene
    file.originalname = file.originalname + '.jpg';
    cb(null, true);
  }
});

const App = Express();
const Puerto = 3002;
// Configuración de Express para servir archivos estáticos
App.use('/public/uploads', Express.static(path.join(__dirname, '../public/uploads')));


App.use(cors());
App.use(Express.json());
App.use(Express.static('public')); // Servir archivos estáticos desde la carpeta public

App.use('/api/user/', handleRoutesUser);
App.use('/api/product/', handleRoutesProduct);

App.get('/', async(req, res) => {
    res.json(`Servidor en funcionamiento`);
});

App.listen(Puerto, () => {
    console.log(`Funcionando en la ruta: http://localhost:${Puerto}`);
});