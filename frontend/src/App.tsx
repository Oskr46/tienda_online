import { useState, useEffect } from "react"
import './styles/App.css'
import Menu from "./components/menu.tsx";
import Inicio from "./components/inicio.tsx";
import VistaProdGeneral from "./components/VistaProdGeneral.tsx";
import Contactos from "./components/contactos.tsx";
import Empleados from "./components/employees/login_module.tsx";

type Page = ('Inicio' | 'Productos' | 'Contactos' | 'Empleados');

interface Product {
  idProduct: number;
  nameProduct: string;
  priceProduct: string;
  maxStockProduct: string;
  minStockProduct: string;
  stockProduct: string;
  urlImg: string;
}

const App: React.FC = () => {
  const [paginaActual, setPaginaActual] = useState<Page>('Inicio');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Product | null>(null);
  const [productos, setProductos] = useState<Product[]>([]);
  
  const obtenerProducts = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3002/api/product/data`);
      const datos = await respuesta.json();
      console.log("Respuesta de la API:", datos);
      if(datos === "No se Encontraron Coincidencias") {
        setProductos([]);
      } else {
        setProductos(datos);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    if (paginaActual === 'Productos') {
      obtenerProducts();
    }
  }, [paginaActual]);

  const refreshProductos = () => {
    obtenerProducts();
    setProductoSeleccionado(null); // Resetear producto seleccionado al refrescar
  };

  const seleccionarMenu = (page: Page) => {
    setPaginaActual(page);
    setProductoSeleccionado(null);
  };

  const seleccionarProducto = (product: Product | null) => {
    setProductoSeleccionado(product);
  };

  return (
    <div>
      <div className="header">
        <a href="/"><h1>LectroMart</h1></a>
        <Menu onNavigate={seleccionarMenu}/>
      </div>
      <div className="contenido">
        {paginaActual === 'Inicio' && <Inicio/>}
        {paginaActual === 'Productos' && (
          <VistaProdGeneral
            refreshProducts={refreshProductos}
            products={productos}
            onSelectProduct={seleccionarProducto}
            selectedProduct={productoSeleccionado}
          />
        )}
        {paginaActual === 'Contactos' && <Contactos />}
        {paginaActual === 'Empleados' && <Empleados/>}
      </div>
    </div>
  );
};

export default App;