import { useState, useEffect } from 'react';
import EditAmount from './editAmount';
import React from 'react';

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
      
      // Aseguramos que productsData sea siempre un array
      let productsData = [];
      if (Array.isArray(data)) {
        productsData = data;
      } else if (data.data && Array.isArray(data.data)) {
        productsData = data.data;
      } else if (data && typeof data === 'object' && !Array.isArray(data)) {
        // Si es un objeto único, lo convertimos a array
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
    return <div style={{ padding: 20, textAlign: 'center', color: '#ffffff' }}>Cargando productos...</div>;
  }

  if (error) {
    return <div style={{ padding: 20, textAlign: 'center', color: '#ff6b6b' }}>Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div style={{ padding: 20, textAlign: 'center', color: '#a0a0a0' }}>No hay productos registrados en la base de datos</div>;
  }

  return (
    <>
      <div>
        <table className='tabla' border={1} cellPadding={5} cellSpacing={3}>
          <thead>
            <tr className='cabecera_tabla'>
              <th>Nombre del Producto</th>
              <th>Imagen del Producto</th>
              <th>Minimo en Stock</th>
              <th>Maximo en Stock</th>
              <th>En Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          
          <tbody>
            {products.map((prod) => (
              <tr key={prod.idProduct}>
                <td>{prod.nameProduct}</td>
                <td>
                  <img 
                    src={`http://localhost:3002${prod.urlImg}`} 
                    width={120} 
                    height={120}
                    alt={prod.nameProduct}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </td>
                <td>{prod.minStockProduct}</td>
                <td>{prod.maxStockProduct}</td>
                <td>{prod.stockProduct}</td>
                <td>
                  <EditAmount productos={prod} refresh={refreshProducts}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductAmountTable;