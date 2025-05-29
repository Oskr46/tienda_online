import React, { useState } from "react";
import "../../styles/login.css";

interface Product {
  idProduct: number;
  nameProduct: string;
  priceProduct: string;
  maxStockProduct: string;
  minStockProduct: string;
  stockProduct: string;
  urlImg: string;
}

interface Props {
  productos: Product;
  refresh: () => void;
}

const EditAmount: React.FC<Props> = ({ productos, refresh }) => {
  const [nombre, setNombre] = useState(productos.nameProduct);
  const [maxStock, setMaxStock] = useState(productos.maxStockProduct);
  const [minStock, setMinStock] = useState(productos.minStockProduct);
  const [stockAmount, setStockAmount] = useState(productos.stockProduct);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateInputs = () => {
    const min = parseInt(minStock);
    const max = parseInt(maxStock);
    const current = parseInt(stockAmount);

    if (isNaN(min) || isNaN(max) || isNaN(current)) {
      return "Todos los campos deben ser números válidos";
    }

    if (max <= min) {
      return "El stock máximo debe ser mayor que el mínimo";
    }

    if (current < min || current > max) {
      return `El stock actual debe estar entre ${min} y ${max}`;
    }

    return null;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3002/api/product/amount/${productos.idProduct}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          minStock,
          maxStock,
          stockAmount,
          id: productos.idProduct
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar el producto');
      }

      const data = await response.json();
      if (data.success) {
        setEditMode(false);
        refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!editMode) {
    return (
      <div>
        <button className="button" onClick={() => setEditMode(true)}>
          Modificar
        </button>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Stock Mínimo del Producto</label>
          <input
            className="input"
            type="number"
            value={minStock}
            onChange={(e) => setMinStock(e.target.value)}
            min="0"
            required
          />
        </div>

        <div>
          <label>Stock Máximo del Producto</label>
          <input
            className="input"
            type="number"
            value={maxStock}
            onChange={(e) => setMaxStock(e.target.value)}
            min={parseInt(minStock) + 1 || 1}
            required
          />
        </div>

        <div>
          <label>Stock Actual del Producto</label>
          <input
            className="input"
            type="number"
            value={stockAmount}
            onChange={(e) => setStockAmount(e.target.value)}
            min={minStock}
            max={maxStock}
            required
          />
        </div>

        <div>
          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar'}
          </button>
          <button 
            className="button_close" 
            type="button"
            onClick={() => {
              setEditMode(false);
              setNombre(productos.nameProduct);
              setMaxStock(productos.maxStockProduct);
              setMinStock(productos.minStockProduct);
              setStockAmount(productos.stockProduct);
              setError("");
            }}
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAmount;