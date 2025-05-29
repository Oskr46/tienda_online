import { Router } from "express";
import { getAllProducts } from "../components/products/getAllProducts";
import { createProduct } from "../components/products/createProduct";
import { updateProduct } from "../components/products/updateProducts";
import { updateAmountProduct } from "../components/products/updateAmountProduct";
import { deleteProduct } from "../components/products/deleteProduct";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); // Configuración básica si no usas la de index.ts

const router = Router();

router.get('/data', getAllProducts);
router.post('/data', upload.single('image'), createProduct); // Añadir middleware para subir archivos
router.put('/data/:id', updateProduct);
router.put('/amount/:id', updateAmountProduct);
router.delete('/data/:id', deleteProduct);

export default router;