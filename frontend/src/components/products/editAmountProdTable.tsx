import { useState, useEffect } from 'react';
import EditAmount from './editAmount'
import React from 'react'

  interface Product{
    idProduct: number;
    nameProduct: string;
    priceProduct: string;
    maxStockProduct: string;
    minStockProduct: string;
    stockProduct: string;
    urlImg: string;
}
const productAmountTable: React.FC = () => {
    const [productos, setProducto] = useState<Product[]>([]);
        
        const obtenerProducts = async() =>{
        const respuesta = await fetch(`http://localhost:3002/api/product/data`);
        const datosProduct = await respuesta.json();
        setProducto(datosProduct);
      }
    
      useEffect(() =>{
        obtenerProducts();
      },[]);
    
      const refreshProductos = () =>{
        obtenerProducts();
      };  
    
    return(
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
                        </tr>
                    </thead>
                    
                    <tbody>
                        {productos.map((prod) => (
                            <tr key={prod.idProduct}>
                                <td>{prod.nameProduct}</td>
                                <td><img src= {`http://localhost:3002${prod.urlImg}`} width={120} height={120}/></td>
                                <td>{prod.minStockProduct}</td>
                                <td>{prod.maxStockProduct}</td>
                                <td>{prod.stockProduct}</td>
                                <td>
                                    <EditAmount productos={prod} refresh={refreshProductos}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default productAmountTable;