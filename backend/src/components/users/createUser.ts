import { Request, Response } from "express";
import pool from "../../conn"

export const createUser = async(req: Request, res: Response) =>{
    const { username, password, fullname } = req.body;

    const campoUserName = username.trim();
    const campoPassword = password.trim();
    const campoFullname = fullname.trim();
    try{
        const query = `INSERT INTO public.user ("userName", "password", "fullNameUser") values ($1,$2,$3)`;
        const result = await pool.query(query, [campoUserName, campoPassword, campoFullname]);

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