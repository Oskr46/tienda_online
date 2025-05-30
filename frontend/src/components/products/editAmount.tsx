import React, { useState } from "react";
import "../../styles/editProduct.css";

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
      <button className="edit-button" onClick={() => setEditMode(true)}>
        Modificar Stock
      </button>
    );
  }

  return (
    <div className="edit-product-container">
      {error && <div className="error-message">{error}</div>}
      <form className="edit-product-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Stock Mínimo</label>
          <input
            type="number"
            value={minStock}
            onChange={(e) => setMinStock(e.target.value)}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Stock Máximo</label>
          <input
            type="number"
            value={maxStock}
            onChange={(e) => setMaxStock(e.target.value)}
            min={parseInt(minStock) + 1 || 1}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock Actual</label>
          <input
            type="number"
            value={stockAmount}
            onChange={(e) => setStockAmount(e.target.value)}
            min={minStock}
            max={maxStock}
            required
          />
        </div>

        <div className="button-group">
          <button className="save-button" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Guardando...
              </>
            ) : 'Guardar'}
          </button>
          <button 
            className="cancel-button" 
            type="button"
            onClick={() => {
              setEditMode(false);
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