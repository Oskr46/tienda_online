import { Request, Response } from "express";
import pool from "../../conn"

export const deleteUser = async(req: Request, res: Response) =>{
    const { username } = req.params;
    const campoUsername = username.trim();
    console.log(username);
    try{
        const query = `DELETE from "public"."user" WHERE "userName" = $1 RETURNING *`;
        const result = await pool.query(query, [campoUsername])

        if(result.rows.length === 0){
            res.json({success: false, message: `ERROR: No se encontraron coincidencias`})
        }
        else{
            res.json({success: true,message: `Se ha eliminado el usuario`, data: result.rows})
        }
    }
    catch(err){
        res.status(500).json("Error en el servidor")
    }
};
