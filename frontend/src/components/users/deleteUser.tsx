import React, { useState } from "react";
import "../../styles/deleteproduct.css";

interface Props {
  idUser: number;
  refresh: () => void;
}

const DeleteUser: React.FC<Props> = ({ idUser, refresh }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3002/api/user/data/${idUser}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el usuario');
      console.error('Error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-container">
      <button 
        className="button_finish" 
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <span className="delete-spinner"></span>
            Eliminando...
          </>
        ) : 'Eliminar'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DeleteUser;