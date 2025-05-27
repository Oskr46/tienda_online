import { Request, Response } from "express";
import pool from "../../conn"

export const logUser = async(req: Request, res: Response) =>{
    const {username, clave} = req.body;
    const campoUsername = username.trim();
    const campoPassword = clave.trim();
    try{
        const query = `SELECT "userName", "fullNameUser", "typeUser" FROM "public"."user" WHERE "userName" = $1 AND "password" = $2`
        const result = await pool.query(query, [campoUsername, campoPassword])

        if(result.rows.length === 0){
            res.json({success: false, message: `No se encontraron coincidencias`})
        }
        else{
            res.json({success:true, data: result.rows[0]})
        }
    }
    catch(err){
        res.status(500).json("Error en el servidor")
    }
};
