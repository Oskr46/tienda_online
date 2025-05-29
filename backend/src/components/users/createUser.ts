import { Request, Response } from "express";
import pool from "../../conn";
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
    const { userName, password, fullNameUser, typeUser } = req.body;

    // Validación de campos requeridos
    if (!userName || !password || !fullNameUser || typeUser === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son obligatorios'
        });
    }

    // Validación de tipo de usuario
    const userType = Number(typeUser);
    if (isNaN(userType)) {
        return res.status(400).json({
            success: false,
            message: 'Tipo de usuario inválido'
        });
    }

    try {
        // Verificar si el usuario ya existe
        const userExists = await pool.query(
            'SELECT * FROM "public"."user" WHERE "userName" = $1',
            [userName.trim()]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'El nombre de usuario ya está en uso'
            });
        }

        // Encriptar contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password.trim(), saltRounds);

        // Crear usuario
        const query = `
            INSERT INTO "public"."user" 
            ("userName", "password", "fullNameUser", "typeUser") 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        
        const result = await pool.query(query, [
            userName.trim(),
            hashedPassword,
            fullNameUser.trim(),
            userType
        ]);

        if (result.rows.length === 0) {
            return res.status(500).json({
                success: false,
                message: 'No se pudo crear el usuario'
            });
        }

        return res.json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Error en createUser:', err);
        return res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
};