import { Router } from "express";
import { getAllProducts } from "../components/products/getAllProducts";
import { createProduct } from "../components/products/createProduct";
import { updateProduct } from "../components/products/updateProducts";
import { deleteProduct } from "../components/products/deleteProduct";

const router = Router();

router.get('/data/user', getAllProducts);
router.post('/data/user', createProduct);
router.put('/data/update/user/:id', updateProduct);
router.delete('data/delete/:id', deleteProduct);

export default router;