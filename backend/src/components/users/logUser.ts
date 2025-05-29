import { Request, Response } from "express";
import pool from "../../conn";
import bcrypt from 'bcrypt';

export const logUser = async (req: Request, res: Response) => {
    const { username, clave } = req.body;
    
    // Validación básica
    if (!username || !clave) {
        return res.status(400).json({
            success: false,
            message: 'Nombre de usuario y contraseña son requeridos'
        });
    }

    const campoUsername = username.trim();
    const campoPassword = clave.trim();

    try {
        // 1. Buscar el usuario por nombre de usuario
        const userQuery = `SELECT * FROM "public"."user" WHERE "userName" = $1`;
        const userResult = await pool.query(userQuery, [campoUsername]);

        if (userResult.rows.length === 0) {
            // No revelar si el usuario existe o no por seguridad
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        const user = userResult.rows[0];
        
        // 2. Comparar la contraseña proporcionada con el hash almacenado
        const passwordMatch = await bcrypt.compare(campoPassword, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // 3. Si todo es correcto, devolver los datos del usuario (sin la contraseña)
        const userData = {
            userName: user.userName,
            fullNameUser: user.fullNameUser,
            typeUser: user.typeUser
        };

        return res.json({
            success: true,
            data: userData
        });

    } catch (err) {
        console.error('Error en logUser:', err);
        return res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
};