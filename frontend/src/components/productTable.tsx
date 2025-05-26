import React from "react"

interface Producto{
  idProduct: number,
  nameProduct: string,
  priceProduct: number,
  maxStockProduct: number,
  minStockProduct: number,
  stockProduct: number,
  urlImg: string
}


interface Props{
    productos: Producto[];
    refresh: () => void;
}

const productTable: React.FC<Props> = ({productos = [], refresh}) => {
    return(
        <>
            <div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Nombre del Producto</th>
                            <th>Precio del Producto</th>
                            <th>Maximo en Stock</th>
                            <th>Minimo en Stock</th>
                            <th>Cantidad en Stock</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {productos.map((prod) => (
                            <tr key={prod.idProduct}>
                                <td>{prod.nameProduct}</td>
                                <td>{prod.priceProduct}</td>
                                <td>{prod.maxStockProduct}</td>
                                <td>{prod.minStockProduct}</td>
                                <td>{prod.stockProduct}</td>
                                <td>{prod.urlImg}</td>
                                <td><img src={`https://localhost:3002${prod.urlImg}`} width={200} height={200}></img></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default productTable;