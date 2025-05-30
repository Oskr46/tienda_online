import { useState } from 'react';
import ProductAmountTable from '../products/editAmountProdTable';
import '../../styles/login.css'
import Bandeja from './bandeja';

function AnalistaPanel(){
  const [modalState, setModalState] = useState(false);
  const [editAmount, setEditAmount] = useState(false);  
  const [bandeja, setBandeja] = useState(false);

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


  const cerrarEditAmount =() =>{
          setEditAmount(false);
          setModalState(false);
      }

    return(
        <>
          {!modalState && <h2>Panel de Gerente</h2>}
          <div className="options">
            {!modalState && <h2>Elija una de las siguientes opciones:</h2>}
            {!modalState && !editAmount && <button onClick= {abrirEditAmount} className="button">Gestionar Inventario de Producto</button>}
            {!modalState && !bandeja && <button onClick= {abrirBandeja} className="button">Bandeja de Entrada</button>}
          </div>

          {modalState && editAmount && <ProductAmountTable/>}
          {modalState && bandeja && <Bandeja/>}
          {modalState && editAmount && <button onClick= {cerrarEditAmount} className="button">Cerrar Gestion de Inventario</button>}
          {modalState && bandeja && <button onClick= {cerrarBandeja} className="button">Cerrar Bandeja de Entrada</button>}
        </>
    )
}
export default AnalistaPanel