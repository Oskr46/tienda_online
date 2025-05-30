import React from "react";
import ProductosItem from "./products/productosItems";
import ProductosDetalles from "./products/productosDetalles";
import "../styles/vistaProducts.css";

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
  return (
    <div className="productos-container">
      <h2>Listado de Productos</h2>
      <div className="productos">
        {!selectedProduct ? (
          <>
            {products.length === 0 ? (
              <div className="no-products">
                <h3>No se encontraron productos</h3>
                <p>Parece que no hay productos disponibles en este momento.</p>
                <button className="reload-btn" onClick={refreshProducts}>
                  Recargar productos
                </button>
              </div>
            ) : (
              <div className="productos-grid">
                {products.map((product) => (
                  <div className="contenedor" key={product.idProduct}>
                    <ProductosItem
                      product={product} 
                      onSelect={onSelectProduct}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
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