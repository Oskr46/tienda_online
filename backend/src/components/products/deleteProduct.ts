import { Request, Response } from "express";
import pool from "../../conn"

export const deleteProduct = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try{
        const query = `DELETE from "public"."products" WHERE "idProduct" = $1 RETURNING *`;
        const result = await pool.query(query, [id])

        if(result.rows.length === 0){
            res.json({success: false, message: `ERROR: No se encontraron coincidencias`})
        }
        else{
            res.json({success: true,message: `Se ha eliminado el usuario`, data: result.rows[0]})
        }
    }
    catch(err){
        res.status(500).json("Error en el servidor")
    }
};
