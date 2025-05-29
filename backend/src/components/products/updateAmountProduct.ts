import { Request, Response } from "express";
import pool from "../../conn";

export const updateAmountProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { minStock, maxStock, stockAmount } = req.body;
  
  // Validación de tipos
  const min = parseInt(minStock);
  const max = parseInt(maxStock);
  const current = parseInt(stockAmount);

  if (isNaN(min)) {
    return res.status(400).json({ 
      success: false, 
      message: 'El stock mínimo debe ser un número válido' 
    });
  }

  if (isNaN(max)) {
    return res.status(400).json({ 
      success: false, 
      message: 'El stock máximo debe ser un número válido' 
    });
  }

  if (isNaN(current)) {
    return res.status(400).json({ 
      success: false, 
      message: 'El stock actual debe ser un número válido' 
    });
  }

  // Validación de lógica de negocio
  if (max <= min) {
    return res.status(400).json({ 
      success: false, 
      message: 'El stock máximo debe ser mayor que el mínimo' 
    });
  }

  if (current < min || current > max) {
    return res.status(400).json({ 
      success: false, 
      message: `El stock actual debe estar entre ${min} y ${max}` 
    });
  }

  try {
    const query = `
      UPDATE "public"."products" 
      SET "minStockProduct" = $1, 
          "maxStockProduct" = $2, 
          "stockProduct" = $3 
      WHERE "idProduct" = $4
      RETURNING *
    `;
    
    const result = await pool.query(query, [min, max, current, id]);

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
};