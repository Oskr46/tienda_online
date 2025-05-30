import React, { useState } from "react";
import "../../styles/detailsProduct.css";

interface Product {
  idProduct: number;
  nameProduct: string;
  priceProduct: string;
  maxStockProduct: string;
  minStockProduct: string;
  stockProduct: string;
  urlImg: string;
}

interface CommentaryData {
  email: string;
  name: string;
  commentary: string;
  valoration: number;
  idProduct: number;
}

interface ProductosDetallesProps {
  product: Product;
  onBack: () => void;
  refreshProducts: () => void;
}

const ProductosDetalles: React.FC<ProductosDetallesProps> = ({ 
  product, 
  onBack,
  refreshProducts 
}) => {
  const [commentData, setCommentData] = useState<CommentaryData>({
    email: '',
    name: '',
    commentary: '',
    valoration: 0,
    idProduct: product.idProduct
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setCommentData(prev => ({
      ...prev,
      [name]: type === 'radio' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await fetch('http://localhost:3002/api/commentary/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData)
      });

      if (!response.ok) {
        throw new Error('Error al enviar el comentario');
      }

      setSubmitSuccess(true);
      setCommentData({
        email: '',
        name: '',
        commentary: '',
        valoration: 0,
        idProduct: product.idProduct
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Ocurrió un error al enviar el comentario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-info">
        <h3>Producto: <br/><u>{product.nameProduct}</u></h3>
        <img 
          className="imagen" 
          src={`http://localhost:3002${product.urlImg}`} 
          alt={product.nameProduct}
        />
        <div>
          <h3>Precio:</h3>
          <p>{product.priceProduct}</p>
        </div>
        <div className="button-group">
          <button 
            className="button" 
            onClick={onBack}
          >
            Volver
          </button>
          <button 
            className="button" 
            onClick={refreshProducts}
          >
            Actualizar Lista
          </button>
        </div>
      </div>

      <div className="comment-section">
        <h3>Deja tu opinión</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={commentData.name}
              onChange={handleInputChange}
              required
              placeholder="Tu nombre completo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={commentData.email}
              onChange={handleInputChange}
              required
              placeholder="tu@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="commentary">Tu opinión:</label>
            <textarea
              id="commentary"
              name="commentary"
              value={commentData.commentary}
              onChange={handleInputChange}
              required
              rows={5}
              placeholder="Escribe tu experiencia con este producto..."
            />
          </div>
          <div className="form-group">
            <label>Calificación (1-5):</label>
            <div className="rating-options">
              {[1, 2, 3, 4, 5].map(num => (
                <label key={num} title={`Calificar con ${num} estrella${num !== 1 ? 's' : ''}`}>
                  <input
                    type="radio"
                    name="valoration"
                    value={num}
                    checked={commentData.valoration === num}
                    onChange={handleInputChange}
                    required
                  />
                  <span>{num}</span>
                </label>
              ))}
            </div>
          </div>
          <button 
            type="submit" 
            className="button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : 'Enviar comentario'}
          </button>
          {submitSuccess && <p className="success-message">¡Comentario enviado con éxito!</p>}
          {submitError && <p className="error-message">{submitError}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProductosDetalles;