import { Request, Response } from "express";
import pool from "../../conn"

export const getAllComments = async(req: Request, res: Response) =>{
    try{
        const query = `SELECT * FROM "public"."commentary"`
        const result = await pool.query(query)
        if(result.rows.length === 0){
            res.json("No se Encontraron Comentarios");
        }
        else{
            res.json(result.rows)
        }
        

    }
    catch(err){
        res.status(500).json({error:"Error en el servidor"})
    }
};
