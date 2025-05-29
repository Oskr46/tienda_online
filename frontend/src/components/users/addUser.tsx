import React, { useState } from "react";
import '../../styles/login.css'

const AddUser: React.FC = () => {
    const [fullNameUser, setFullNameUser] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [typeUser, setTypeUser] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const checkUserExists = async (username: string) => {
        try {
            const response = await fetch(`http://localhost:3002/api/user/check/${username}`);
            const data = await response.json();
            return data.exists;
        } catch (error) {
            console.error('Error al verificar usuario:', error);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validación básica
        if (!fullNameUser || !userName || !password || !typeUser) {
            setError('Todos los campos son obligatorios');
            return;
        }

        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            // 1. Verificar si el usuario ya existe
            const userExists = await checkUserExists(userName);
            
            if (userExists) {
                setError('El nombre de usuario ya está registrado');
                setIsSubmitting(false);
                return;
            }

            // 2. Registrar el nuevo usuario
            const response = await fetch(`http://localhost:3002/api/user/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullNameUser,
                    userName,
                    password,
                    typeUser: Number(typeUser)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al registrar el usuario');
            }

            if (data.success) {
                // Resetear formulario
                setFullNameUser('');
                setUserName('');
                setPassword('');
                setTypeUser('');
                setSuccess('Usuario registrado exitosamente');
            } else {
                throw new Error(data.message || 'Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'Ocurrió un error al registrar el usuario');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Registrar Usuario</h2>
                {success && <div className="success-message">{success}</div>}
                <div className="form-group">
                    <label>Nombre Completo</label>
                    <input 
                        className="input" 
                        type="text" 
                        value={fullNameUser} 
                        placeholder="Ingrese el nombre completo" 
                        onChange={(e) => setFullNameUser(e.target.value)} 
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Nombre de Usuario</label>
                    <input 
                        className="input" 
                        type="text"
                        value={userName} 
                        placeholder="Ingrese el nombre de usuario" 
                        onChange={(e) => setUserName(e.target.value)} 
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Contraseña</label>
                    <input 
                        className="input" 
                        type="password" 
                        value={password} 
                        placeholder="Ingrese la contraseña" 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Tipo de Usuario</label>
                    <select
                        className="input"
                        value={typeUser}
                        onChange={(e) => setTypeUser(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="0">Administrador</option>
                        <option value="1">Gerente</option>
                        <option value="2">Analista</option>
                    </select>
                </div>
                
                <div className="button-group">
                    <button className="button" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Registrando...' : 'Registrar Usuario'}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </form>
        </div>
    );
};

export default AddUser;