import React, { useState } from "react";
import '../../styles/login.css';

const AddProduct: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecciona un archivo de imagen válido');
                return;
            }

            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await fetch(`http://localhost:3002/api/product/data`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al guardar el producto');
            }

            const result = await response.json();
            console.log('Producto creado:', result);

            // Resetear formulario
            setName('');
            setPrice('');
            setImageFile(null);
            setImagePreview('');
            
            alert('Producto creado exitosamente!');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Ocurrió un error al guardar el producto');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-header">
                    <h2>Agregar Producto</h2>
                    <p className="login-subtitle">Complete los detalles del nuevo producto</p>
                </div>
                
                <div className="form-group">
                    <label htmlFor="product-name">Nombre del Producto</label>
                    <input 
                        id="product-name"
                        className="form-group input" 
                        type="text" 
                        value={name} 
                        placeholder="Ingrese el nombre del producto" 
                        onChange={(e) => setName(e.target.value)} 
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="product-price">Precio del Producto</label>
                    <input 
                        id="product-price"
                        className="form-group input" 
                        type="number" 
                        min={0} 
                        value={price} 
                        placeholder="Ingrese el precio del producto" 
                        onChange={(e) => setPrice(e.target.value)} 
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="product-image">Imagen del Producto</label>
                    <input 
                        id="product-image"
                        className="form-group input" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        required
                    />
                </div>

                {imagePreview && (
                    <div className="image-preview">
                        <img 
                            src={imagePreview} 
                            alt="Vista previa" 
                            className="preview-image"
                        />
                    </div>
                )}

                <button 
                    className="login-button" 
                    type="submit" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner"></span>
                            Enviando...
                        </>
                    ) : 'Agregar Producto'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;