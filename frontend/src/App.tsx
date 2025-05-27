import { useState, useEffect } from "react"
import './styles/App.css'
import Menu from "./components/menu.tsx";
import Inicio from "./components/inicio.tsx";
import VistaProdGeneral from "./components/VistaProdGeneral.tsx";
import Contactos from "./components/contactos.tsx";
import Empleados from "./components/employees/login_module.tsx";
type Page = ('Inicio' | 'Productos' | 'Contactos' | 'Empleados');

  interface Product{
    idProduct: number;
    nameProduct: string;
    priceProduct: number;
    maxStock: number;
    minStock: number;
    stockAmount: number;
    urlImg: string;
}

  const App: React.FC = () => {
    const [paginaActual, setPaginaActual] = useState<Page>('Inicio');
    const [productoSeleccionado, setProductoSeleccionado] = useState<Product | null>(null);
    const [producto, setProducto] = useState<Product[]>([]);
    
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
    
    const seleccionarMenu = (page : Page) => {
      setPaginaActual(page);
      setProductoSeleccionado(null);
    }

    const seleccionarProducto = (product: Product | null) => {
      setProductoSeleccionado(product);
    }

    return (
      <div>
        <div className="header">
          <a href="/"><h1>LectroMart</h1></a>
          <Menu onNavigate = {seleccionarMenu}/>
        </div>
        <div className="contenido">
          {paginaActual === 'Inicio' && <Inicio/>}
          {paginaActual === 'Productos' && (
            <VistaProdGeneral
            products = {producto}
            onSelectProduct = {seleccionarProducto}
            selectedProduct = {productoSeleccionado}
            />
          )}
          {paginaActual === 'Contactos' && <Contactos />}
          {paginaActual === 'Empleados' && <Empleados/>}
        </div>
      </div>
    );
  };
export default App
