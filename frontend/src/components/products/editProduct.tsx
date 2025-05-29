import React, { useState, useRef, ChangeEvent } from "react";
import "../../styles/login.css";

  interface Product{
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

const EditProduct: React.FC<Props> = ({ productos, refresh }) => {
  const [nombre, setNombre] = useState(productos.nameProduct);
  const [price, setPrice] = useState(productos.priceProduct);
  const [previewImg, setPreviewImg] = useState(productos.urlImg);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      // Siempre enviar los datos básicos
      formData.append('name', nombre);
      formData.append('price', price);
      formData.append('idProduct', productos.idProduct.toString());
      
      // Solo agregar la imagen si se seleccionó una nueva
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await fetch(`http://localhost:3002/api/product/data/${productos.idProduct}`, {
        method: 'PUT',
        body: formData,
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
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Nombre del Producto</label>
          <input
            className="input"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label>Precio del Producto</label>
          <input
            className="input"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Imagen del Producto</label>
          {previewImg && (
            <div>
              <img 
                src={previewImg} 
                alt="Vista previa" 
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </div>
          )}
          <input
            className="input"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
          <small>Dejar vacío para mantener la imagen actual</small>
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
              setPrice(productos.priceProduct);
              setPreviewImg(productos.urlImg);
              setSelectedFile(null);
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

export default EditProduct;