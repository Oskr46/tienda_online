import React, { useState } from "react";
import "../../styles/login.css";

interface Props {
  idProduct: number;
  refresh: () => void;
}

const DeleteProduct: React.FC<Props> = ({ idProduct, refresh }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3002/api/product/data/${idProduct}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el producto');
      console.error('Error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button 
        className="button_finish" 
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Eliminando...' : 'Eliminar'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default DeleteProduct;