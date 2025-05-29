import { useState } from 'react';
import '../../styles/login.css'

function AnalistaPanel(){
  const [modalState, setModalState] = useState(false);
    
    return(
        <>
          {!modalState && <h2>Panel de Gerente</h2>}
          <div className="options">
            <h2>Elija una de las siguientes opciones:</h2>
            {!modalState && <button className="button">Gestionar Inventario de Producto</button>}
            {!modalState && <button className="button">Bandeja de Entrada</button>}
          </div>
        </>
    )
}
export default AnalistaPanel