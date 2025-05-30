import { useState } from 'react';
import '../../styles/login.css'
import AddProduct from '../products/addProduct';
import ProductTable from '../products/editProductTable';
import ProductAmountTable from '../products/editAmountProdTable';
import Bandeja from './bandeja';

function GerentePanel(){
  const [vistaAddProd, setVistaAddProd] = useState(false);
  const [vistaProd, setVistaProd] = useState(false);
  const [EditAmount, setEditAmount] = useState(false);
  const [bandeja, setBandeja] = useState(false);
  const [modalState, setModalState] = useState(false);

      const abrirVistaAdd =() =>{
          setVistaAddProd(true);
          setModalState(true);
      }
    
    const abrirVistaProd =() =>{
          setVistaProd(true);
          setModalState(true);
      }

      const abrirEditAmount =() =>{
          setEditAmount(true);
          setModalState(true);
      }
    

    const abrirBandeja =() =>{
          setBandeja(true);
          setModalState(true);
      }
    
      const cerrarBandeja =() =>{
          setBandeja(false);
          setModalState(false);
      }

      const cerrarVistaAdd =() =>{
          setVistaAddProd(false);
          setModalState(false);
      }
    
        const cerrarVistaProd =() =>{
          setVistaProd(false);
          setModalState(false);
      }

      const cerrarEditAmount =() =>{
          setEditAmount(false);
          setModalState(false);
      }
    return(
        <>
           <div>
             {!modalState && <h2>Panel de Gerente</h2>}
            <div className="options">
              <h2>Elija una de las siguientes opciones:</h2>
              {!modalState && !EditAmount && <button className="button" onClick={abrirEditAmount}>Gestionar Inventario de Producto</button>}
              {!modalState && !vistaAddProd && <button className="button" onClick={abrirVistaAdd}>Agregar Producto</button>}
              {!modalState && !vistaProd && <button className="button" onClick={abrirVistaProd}>Ver Productos</button>}
              {!modalState && !bandeja && <button className="button" onClick={abrirBandeja}>Bandeja de Entrada</button>}
            </div>
            {modalState && vistaAddProd && <AddProduct/>}
            {modalState && vistaProd && <ProductTable/>}
            {modalState && EditAmount && <ProductAmountTable/>}
            {modalState && bandeja && <Bandeja/>}
            {modalState && vistaAddProd && <button className="button_finish" onClick={cerrarVistaAdd}>Cerrrar Vista de Agregado</button>}
            {modalState && vistaProd && <button className="button_finish" onClick={cerrarVistaProd}>Cerrrar Vista de Productos</button>}
            {modalState && EditAmount && <button className="button_finish" onClick={cerrarEditAmount}>Cerrrar Vista de Inventario</button>}
            {modalState && bandeja && <button className="button_finish" onClick={cerrarBandeja}>Cerrrar Vista de Comentarios</button>}
          </div>
        </>
    )
}
export default GerentePanel