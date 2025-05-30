import { useState, useEffect } from 'react';
import EditAmount from './editAmount';
import React from 'react';
import '../../styles/productTable.css'; // Reutilizando el CSS existente

interface Product {
  idProduct: number;
  nameProduct: string;
  priceProduct: string;
  maxStockProduct: string;
  minStockProduct: string;
  stockProduct: string;
  urlImg: string;
}

const ProductAmountTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
        
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3002/api/product/data', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }
      
      const data = await response.json();
      
      let productsData = [];
      if (Array.isArray(data)) {
        productsData = data;
      } else if (data.data && Array.isArray(data.data)) {
        productsData = data.data;
      } else if (data && typeof data === 'object' && !Array.isArray(data)) {
        productsData = [data];
      }
      
      setProducts(productsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error al cargar productos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refreshProducts = () => {
    fetchProducts();
  };

  if (loading) {
    return <div className="loading-state">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="empty-state">No hay productos registrados en la base de datos</div>;
  }

  return (
    <div className="product-table-container">
      <div className="product-table-header">
        <h2 className="product-table-title">Gestión de Inventario</h2>
      </div>
      
      <table className="products-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Imagen</th>
            <th>Stock Mínimo</th>
            <th>Stock Máximo</th>
            <th>Stock Actual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.idProduct}>
              <td>{prod.nameProduct}</td>
              <td>
                {prod.urlImg && (
                  <img 
                    src={`http://localhost:3002${prod.urlImg}`}
                    className="product-image"
                    alt={prod.nameProduct}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
              </td>
              <td>{prod.minStockProduct}</td>
              <td>{prod.maxStockProduct}</td>
              <td>{prod.stockProduct}</td>
              <td>
                <div className="actions-container">
                  <EditAmount productos={prod} refresh={refreshProducts}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductAmountTable;