import React, { useState } from "react";
import '../../styles/login.css'

const AddProduct: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [maxStockProduct, setMaxStockProduct] = useState('');
    const [minStockProduct, setMinStockProduct] = useState('');
    const [stockProduct, setStockProduct] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validar que sea una imagen
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecciona un archivo de imagen válido');
                return;
            }

            setImageFile(file);
            
            // Crear vista previa
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
        formData.append('maxStockProduct', maxStockProduct);
        formData.append('minStockProduct', minStockProduct);
        formData.append('stockProduct', stockProduct);
        
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await fetch(`http://localhost:3002/api/product/data`, {
            method: 'POST',
            body: formData
            // No establezcas el header 'Content-Type', el navegador lo hará automáticamente con el boundary correcto
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
        setMinStockProduct('');
        setMaxStockProduct('');
        setStockProduct('');
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
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Agregar Producto</h2>
                <div>
                    <label>Nombre del Producto</label>
                    <input 
                        className="input" 
                        type="text" 
                        value={name} 
                        placeholder="Ingrese el nombre del producto" 
                        onChange={(e) => setName(e.target.value)} 
                        required
                    /><br />
                    
                    <label>Precio del Producto</label>
                    <input 
                        className="input" 
                        type="number" 
                        min={0} 
                        value={price} 
                        placeholder="Ingrese el precio del producto" 
                        onChange={(e) => setPrice(e.target.value)} 
                        required
                    /><br />

                    <label>Máximo de Stock del Producto</label>
                    <input 
                        className="input" 
                        type="number" 
                        min={0} 
                        value={maxStockProduct} 
                        placeholder="Ingrese el máximo de stock" 
                        onChange={(e) => setMaxStockProduct(e.target.value)} 
                        required
                    /><br />
                    
                    <label>Mínimo de Stock del Producto</label>
                    <input 
                        className="input" 
                        type="number" 
                        min={0} 
                        value={minStockProduct} 
                        placeholder="Ingrese el mínimo de stock" 
                        onChange={(e) => setMinStockProduct(e.target.value)} 
                        required
                    /><br />

                    <label>Stock actual del Producto</label>
                    <input 
                        className="input" 
                        type="number" 
                        min={0} 
                        value={stockProduct} 
                        placeholder="Ingrese el stock actual" 
                        onChange={(e) => setStockProduct(e.target.value)} 
                        required
                    /><br />
                    
                    <label>Imagen para el Producto</label>
                    <input 
                        className="input" 
                        type="file" 
                        accept="image/*" 
                        placeholder="Ingrese la imagen del producto" 
                        onChange={handleImageChange} 
                        required
                    /><br />

                    {imagePreview && (
                        <div style={{ margin: '10px 0' }}>
                            <img 
                                src={imagePreview} 
                                alt="Vista previa" 
                                style={{ maxWidth: '200px', maxHeight: '200px' }} 
                            />
                        </div>
                    )}

                    <button className="button" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Agregar Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;