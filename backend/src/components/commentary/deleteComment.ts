import { Request, Response } from "express";
import pool from "../../conn"

export const deleteCommentary = async(req: Request, res: Response) =>{
    const { id } = req.params;
    const campoID = id.trim();
    try{
        const query = `DELETE from "public"."commentary" WHERE "idCommentary" = $1 RETURNING *`;
        const result = await pool.query(query, [campoID])

        if(result.rows.length === 0){
            res.json({success: false, message: `ERROR: No se encontraron coincidencias`})
        }
        else{
            res.json({success: true,message: `Se ha eliminado el Comentario`, data: result.rows[0]})
        }
    }
    catch(err){
        res.status(500).json("Error en el servidor")
    }
};
