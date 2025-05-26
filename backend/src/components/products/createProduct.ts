import { Request, Response } from "express";
import pool from "../../conn";
import path from 'path';
import fs from 'fs';

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, maxStockProduct, minStockProduct, stockProduct } = req.body;
    const file = req.file;

    try {
        // Validar que se subió un archivo
        if (!file) {
            return res.status(400).json({ error: 'No se subió ningún archivo de imagen' });
        }

        // Verificar y corregir extensión del archivo
        let finalFilename = file.filename;
        if (!path.extname(file.filename)) {
            const fileExt = path.extname(file.originalname) || '.jpg';
            finalFilename = `${file.filename}${fileExt}`;
            const newPath = path.join(path.dirname(file.path), finalFilename);
            
            fs.renameSync(file.path, newPath);
        }

        // Construir URL de la imagen
        const imageUrl = `../../public/uploads/${finalFilename}`;

        // Validar datos numéricos
        const priceNumber = parseFloat(price);
        const maxStock = parseInt(maxStockProduct);
        const minStock = parseInt(minStockProduct);
        const currentStock = parseInt(stockProduct);

        if (isNaN(priceNumber) || isNaN(maxStock) || isNaN(minStock) || isNaN(currentStock)) {
            // Eliminar archivo subido si la validación falla
            fs.unlinkSync(path.join(path.dirname(file.path), finalFilename));
            return res.status(400).json({ error: 'Datos numéricos inválidos' });
        }

        // Insertar en la base de datos
        const query = `
            INSERT INTO public.products (
                "nameProduct", 
                "priceProduct", 
                "maxStockProduct", 
                "minStockProduct", 
                "stockProduct", 
                "urlImg"
            ) VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
        `;

        const result = await pool.query(query, [
            name,
            priceNumber,
            maxStock,
            minStock,
            currentStock,
            imageUrl
        ]);

        res.json({
            success: true,
            product: result.rows[0],
            imageUrl: imageUrl
        });

    } catch (err) {
        console.error('Error al crear producto:', err);
        
        // Eliminar archivo subido si ocurre un error
        if (file) {
            try {
                const filePath = path.join(file.destination, file.filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (unlinkErr) {
                console.error('Error al eliminar archivo:', unlinkErr);
            }
        }

        res.status(500).json({ 
            error: "Error en el servidor",
            details: err instanceof Error ? err.message : 'Error desconocido'
        });
    }
};