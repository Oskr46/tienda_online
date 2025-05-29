import React, { useState } from "react";
import "../../styles/login.css";

interface UserData {
  idUser: number;
  fullNameUser: string;
  userName: string;
  typeUser: number;
}

interface Props {
  user: UserData;
  refresh: () => void;
}

const EditUser: React.FC<Props> = ({ user, refresh }) => {
  const [fullName, setFullName] = useState(user.fullNameUser);
  const [username, setUsername] = useState(user.userName);
  const [userType, setUserType] = useState(user.typeUser.toString());
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !username || !userType) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3002/api/user/data/${user.idUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullNameUser: fullName,
          userName: username,
          typeUser: Number(userType)
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar el usuario');
      }

      refresh();
      setEditMode(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el usuario');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!editMode) {
    return (
      <button className="button" onClick={() => setEditMode(true)}>
        Editar
      </button>
    );
  }

  return (
    <div className="edit-user-container">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input
            className="input"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nombre de Usuario</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo de Usuario</label>
          <select
            className="input"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="0">Administrador</option>
            <option value="1">Gerente</option>
            <option value="2">Analista</option>
          </select>
        </div>

        <div className="button-group">
          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar'}
          </button>
          <button 
            className="button_close" 
            type="button"
            onClick={() => setEditMode(false)}
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;