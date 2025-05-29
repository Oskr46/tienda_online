import { Request, Response } from "express";
import pool from "../../conn";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (JPEG, JPG, PNG, GIF)'));
    }
  }
}).single('image');

export const updateProduct = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ 
        success: false, 
        message: err.message 
      });
    }

    const { id } = req.params;
    const { name, price, img } = req.body;
    
    // Usar la imagen existente si no se subió una nueva
    let imagePath = img; // Mantener la imagen existente por defecto
    
    // Si se subió una nueva imagen, usar esa
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    try {
      const query = `
        UPDATE "public"."products" 
        SET "nameProduct" = COALESCE($1, "nameProduct"), 
            "priceProduct" = COALESCE($2, "priceProduct"), 
            "urlImg" = COALESCE($3, "urlImg") 
        WHERE "idProduct" = $4 
        RETURNING *
      `;
      
      const result = await pool.query(query, [
        name?.trim(), 
        price?.trim(), 
        imagePath, 
        id.trim()
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Producto no encontrado' 
        });
      }

      return res.json({ 
        success: true,
        message: 'Producto actualizado correctamente', 
        data: result.rows[0] 
      });
    } catch (err) {
      console.error('Error en updateProduct:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Error en el servidor' 
      });
    }
  });
};