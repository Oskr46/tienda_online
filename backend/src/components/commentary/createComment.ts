import { Request, Response } from "express";
import pool from "../../conn";

export const createComment = async (req: Request, res: Response) => {
    const { email, name , commentary, valoration, idProduct } = req.body;

    // Validación de campos requeridos
    if (!email || !name || !commentary || valoration === undefined || idProduct == undefined) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son obligatorios'
        });
    }

    try{
    const query = `INSERT INTO "public"."commentary" ("emailCommentary", "nameCommentary", "textCommentary", "valoration", "idProduct") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        
        const result = await pool.query(query, [
            email.trim(),
            name.trim(),
            commentary.trim(),
            valoration,
            idProduct
        ]);

        if (result.rows.length === 0) {
            return res.status(500).json({
                success: false,
                message: 'No se pudo crear el comentario'
            });
        }

        return res.json({
            success: true,
            message: 'Comentario creado exitosamente',
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Error en createCommentary:', err);
        return res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
};