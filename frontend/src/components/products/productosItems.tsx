import React from "react"
import "../../styles/vistaProducts.css"

interface Product {
  idProduct: number;
  nameProduct: string;
  priceProduct: string;
  maxStockProduct: string;
  minStockProduct: string;
  stockProduct: string;
  urlImg: string;
}

interface ProductosItemProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductosItem: React.FC<ProductosItemProps> = ({ product, onSelect }) => {
  return (
    <div onClick={() => onSelect(product)}>
      <img 
        className="imagen" 
        src={`http://localhost:3002${product.urlImg}`} 
        alt={product.nameProduct} 
      />
      <h3>Nombre: {product.nameProduct}</h3>
      <p>Precio: {product.priceProduct}</p>
    </div>
  );
};

export default ProductosItem;