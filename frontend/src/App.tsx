import { useEffect, useState } from "react"
import ProductTable from "./components/productTable";
import './styles/App.css'
import AddProduct from "./components/addProduct";

/*interface Usuario{
  userName: string,
  password: string,
  fullNameUser: string,
  typeUser: number,
}*/

interface Producto{
  idProduct: number,
  nameProduct: string,
  priceProduct: number,
  maxStockProduct: number,
  minStockProduct: number,
  stockProduct: number,
  urlImg: string
}


function App() {
const [producto, setProducto] = useState<Producto[]>([]);
  const obtenerProducts = async() =>{
    const respuesta = await fetch(`http://localhost:3002/api/product/data`);
    const datos = await respuesta.json();
    console.log("Respuesta de la API:", datos);
    if(datos === "No se Encontraron Coincidencias"){
      setProducto([]);
    }
    else{
    setProducto(datos);
    }
  }

  useEffect(() =>{
    obtenerProducts();
  },[]);

  const refreshProductos = () =>{
    obtenerProducts();
  };

  return (
    <>
      <div>
        <h1>CRUD de Productos de la tienda</h1>
        <AddProduct refresh={refreshProductos}/>
        <ProductTable productos={producto} refresh={refreshProductos}/>
      </div>
    </>
  );
}

export default App
