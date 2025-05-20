import { Request, Response } from "express";
import pool from "../../conn"

export const getAllUsers = async(req: Request, res: Response) =>{
    try{
        const query = `SELECT * FROM "public"."user"`
        const result = await pool.query(query)

        if(result.rows.length === 0){
            res.json({success: false, message: `No se encontraron coincidencias`})
        }
        else{
            res.json({success: true,message: `Se han encontrado los usuarios: `, data: result.rows})
        }
    }
    catch(err){
        res.status(500).json("Error en el servidor")
    }
};
