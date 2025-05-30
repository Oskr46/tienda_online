import { Request, Response } from "express";
import pool from "../../conn"

export const updateUser = async(req: Request, res: Response) =>{
    const {username} = req.params;
    const {typeUser, fullNameUser} = req.body;

    const campoUsername = username.trim();
    const campoFullNameUser = fullNameUser.trim();

    try{
        const query = `UPDATE "public"."user" SET "fullNameUser" = $1, "typeUser" = $2 
        WHERE "userName" = $3 RETURNING *`;
        
        const result = await pool.query(query, [campoFullNameUser, typeUser, campoUsername])

        if(result.rows.length === 0){
            res.json({success: false, message: `No se encontraron coincidencias`})
        }
        else{
            res.json({success: true,message: `Se ha actualizado el usuario: `, data: result.rows[0]})
        }
    }
    catch(err){
        res.status(500).json("Error en el servidor")
    }
};
