import React from "react";
import ProductosItem from "./products/productosItems";
import ProductosDetalles from "./products/productosDetalles";
import "../styles/products.css";

interface Product {
  idProduct: number;
  nameProduct: string;
  priceProduct: string;
  maxStockProduct: string;
  minStockProduct: string;
  stockProduct: string;
  urlImg: string;
}

interface productsProp {
  products: Product[];
  onSelectProduct: (product: Product | null) => void;
  selectedProduct: Product | null;
  refreshProducts: () => void;
}

const VistaProdGeneral: React.FC<productsProp> = ({
  products, 
  onSelectProduct, 
  selectedProduct, 
  refreshProducts
}) => {
  // Dividir productos en grupos de 4 para las columnas
  const getProductColumns = () => {
    const columns = [];
    const productsPerColumn = 2;
    const columnCount = Math.min(Math.ceil(products.length / productsPerColumn), 4);
    
    for (let i = 0; i < columnCount; i++) {
      columns.push(
        products.slice(i * productsPerColumn, (i + 1) * productsPerColumn)
      );
    }
    
    return columns;
  };

  const productColumns = getProductColumns();

  return (
    <div className="productos-container">
      <h2>Listado de Productos</h2>
      <div className="productos">
        {!selectedProduct ? (
          <div className="productos-grid">
            {productColumns.map((column, columnIndex) => (
              <div key={`column-${columnIndex}`} className="productos-column">
                {column.map((product) => (
                  <div className="contenedor" key={product.idProduct}>
                    <ProductosItem
                      product={product} 
                      onSelect={onSelectProduct}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <ProductosDetalles 
            product={selectedProduct} 
            onBack={() => onSelectProduct(null)}
            refreshProducts={refreshProducts}
          />
        )}
      </div>
    </div>
  );
};

export default VistaProdGeneral;