import { Request, Response } from "express";
import pool from "../../conn";
import path from 'path';
import fs from 'fs';

export const createProduct = async (req: Request, res: Response) => {
    // Verificar que el middleware de multer procesó el archivo
    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo de imagen' });
    }

    // Los campos del formulario vienen en req.body
    const { name, price, maxStockProduct, minStockProduct, stockProduct } = req.body;

    // Validar que todos los campos requeridos están presentes
    if (!name || !price || !maxStockProduct || !minStockProduct || !stockProduct) {
        // Eliminar archivo subido si la validación falla
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        let finalFilename = req.file.filename;
        
        // Corregir extensión si es necesario
        if (!path.extname(req.file.filename)) {
            const fileExt = path.extname(req.file.originalname) || '.jpg';
            finalFilename = `${req.file.filename}${fileExt}`;
            const newPath = path.join(path.dirname(req.file.path), finalFilename);
            
            fs.renameSync(req.file.path, newPath);
        }

        const imageUrl = `/uploads/${finalFilename}`;

        // Convertir y validar datos numéricos
        const priceNumber = parseFloat(price);
        const maxStock = parseInt(maxStockProduct);
        const minStock = parseInt(minStockProduct);
        const currentStock = parseInt(stockProduct);

        if (isNaN(priceNumber) || isNaN(maxStock) || isNaN(minStock) || isNaN(currentStock)) {
            fs.unlinkSync(path.join(path.dirname(req.file.path), finalFilename));
            return res.status(400).json({ error: 'Datos numéricos inválidos' });
        }

        // Validar que el stock actual esté entre mínimo y máximo
        if (currentStock < minStock || currentStock > maxStock) {
            fs.unlinkSync(path.join(path.dirname(req.file.path), finalFilename));
            return res.status(400).json({ 
                error: `El stock actual debe estar entre ${minStock} y ${maxStock}` 
            });
        }

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

        res.status(201).json({
            success: true,
            product: result.rows[0],
            imageUrl: imageUrl
        });

    } catch (err) {
        console.error('Error al crear producto:', err);
        
        // Eliminar archivo subido si ocurre un error
        if (req.file) {
            try {
                const filePath = path.join(req.file.destination, req.file.filename);
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