import { Request, Response } from "express";
import pool from "../../conn"

export const updateProduct = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const {name, price, max, min, stock} = req.body;

    const campoID = id.trim();
    const campoName = name.trim();
    const campoPrice = price.trim();
    const campoMax = max.trim();
    const campoMin = min.trim();
    const campoStock = stock.trim();

    try{
        const query = `UPDATE "public"."products" SET "nameProduct" = $1 AND "priceProduct" = $2 
        AND "maxStockProduct" = $3 AND "minStockProduct" = $4 AND "stockProduct" = $5 WHERE "idProduct" = $6 RETURNING *`;
        
        const result = await pool.query(query, [campoName, campoPrice, campoMax, campoMin, campoStock, campoID])

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
