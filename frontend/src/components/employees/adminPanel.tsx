import { useState } from 'react';
import '../styles/login.css'
import AddProduct from '../addProduct';

function AdminPanel(){
  const [vistaAddProd, setVistaAddProd] = useState(false);
  const [vistaProd, setVistaProd] = useState(false);
  const [modalState, setModalState] = useState(false);
    
      const abrirVistaAdd =() =>{
          setVistaAddProd(true);
          setModalState(true);
      }
    
    const abrirVistaProd =() =>{
          setVistaProd(true);
          setModalState(true);
      }
    
      const cerrarVistaAdd =() =>{
          setVistaAddProd(false);
          setModalState(false);
      }
    
        const cerrarVistaProd =() =>{
          setVistaProd(false);
          setModalState(false);
      }
    return(
        <>
            <div>
                {!modalState && <h2>Panel de Administrador</h2>}
                <div className="options">
                <h2>Elija una de las siguientes opciones:</h2>
                {!modalState && !vistaAddProd && <button className="button" onClick={abrirVistaAdd}>Gestionar Inventario de Producto</button>}
                {!modalState && !vistaAddProd && <button className="button" onClick={abrirVistaAdd}>Agregar Producto</button>}
                {!modalState && !vistaProd && <button className="button" onClick={abrirVistaProd}>Ver Productos</button>}
                {!modalState && <button className="button">Agregar Usuario</button>}
                {!modalState && <button className="button">Ver Usuarios</button>}
                {!modalState && <button className="button">Reporte de Usuarios</button>}
                {!modalState && <button className="button">Reporte de Productos</button>}
                {!modalState && <button className="button">Bandeja de Entrada</button>}
            </div>
            {modalState && vistaAddProd && <AddProduct/>}
            {modalState && vistaAddProd && <button className="button_finish" onClick={cerrarVistaAdd}>Cerrrar Vista de Agregado</button>}
            {modalState && vistaProd && <button className="button_finish" onClick={cerrarVistaProd}>Cerrrar Vista de Productos</button>}
          </div>
        </>
    )
}
export default AdminPanel