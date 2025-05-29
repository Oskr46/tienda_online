import cors from 'cors';
import Express from 'express';
import handleRoutesUser from "./routes/handleRoutesUser";
import handleRoutesProduct from "./routes/handleRoutesProduct";
import handleRoutesCommentary from "./routes/handleRoutesComments";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const originalExt = path.extname(file.originalname) || '.jpg';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${originalExt}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: Solo se permiten imágenes (jpeg, jpg, png, gif)'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

const App = Express();
const Puerto = 3002;

// Configuración CORS
App.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middlewares para parsear JSON y URL encoded
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));

// Servir archivos estáticos
App.use('/uploads', Express.static(path.join(__dirname, '../uploads')));

// Rutas
App.use('/api/user/', handleRoutesUser);
App.use('/api/commentary/', handleRoutesCommentary);

// Aplicar Multer solo a las rutas que lo necesitan
App.use('/api/product/', handleRoutesProduct); // Rutas que no requieren upload
App.post('/api/product/data', upload.single('image'), (req, res, next) => {
  // Pasar el control al manejador de rutas de productos
  handleRoutesProduct(req, res, next);
});

// Ruta de prueba
App.get('/', (req, res) => {
  res.json({ status: 'Servidor en funcionamiento' });
});

App.listen(Puerto, () => {
  console.log(`Servidor corriendo en: http://localhost:${Puerto}`);
});