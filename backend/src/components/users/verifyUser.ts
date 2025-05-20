import { Request, Response } from "express";
import pool from "../../conn"

export const verifyUser = async(req: Request, res: Response) =>{
    const { username } = req.params;
    const campoUsername = username.trim();
    try{
        const query = `SELECT "userName" FROM "public"."user" where "userName" = $1`
        const result = await pool.query(query, [campoUsername])

        if(result.rows.length === 0){
            res.json({success: false, message: `No se encontraron coincidencias`})
        }
        else{
            res.json({success: true,message: `Se ha encontrado el usuario`, data: result.rows[0]})
        }
    }
    catch(err){
        res.status(500).json("Error en el servidor")
    }
};
