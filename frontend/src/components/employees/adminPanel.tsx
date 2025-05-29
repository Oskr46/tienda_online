import { useState } from 'react';
import '../../styles/login.css'
import AddProduct from '../products/addProduct';
import ProductTable from '../products/editProductTable';
import UserTable from '../users/UsersTable';
import ProductAmountTable from '../products/editAmountProdTable';
import AddUser from '../users/addUser';
import Bandeja from './bandeja';


function AdminPanel(){
  const [vistaAddProd, setVistaAddProd] = useState(false);
  const [vistaProd, setVistaProd] = useState(false);
  const [EditAmount, setEditAmount] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [vistaUser, setVistaUser] = useState(false);
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
    
      const abrirAddUser =() =>{
          setAddUser(true);
          setModalState(true);
      }
    
      const abrirVistaUser =() =>{
          setVistaUser(true);
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


      const cerrarVistaUser =() =>{
          setVistaUser(false);
          setModalState(false);
      }


      const cerrarAddUser =() =>{
          setAddUser(false);
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
                {!modalState && <h2>Panel de Administrador</h2>}
                <div className="options">
                {!modalState && <h2>Elija una de las siguientes opciones:</h2>}
                {!modalState && !EditAmount && <button className="button" onClick={abrirEditAmount}>Gestionar Inventario de Producto</button>}
                {!modalState && !vistaAddProd && <button className="button" onClick={abrirVistaAdd}>Agregar Producto</button>}
                {!modalState && !vistaProd && <button className="button" onClick={abrirVistaProd}>Ver Productos</button>}
                {!modalState && !addUser && <button className="button" onClick={abrirAddUser}>Agregar Usuario</button>}
                {!modalState && !vistaUser && <button className="button" onClick={abrirVistaUser}>Ver Usuarios</button>}
                {!modalState && !bandeja && <button className="button" onClick={abrirBandeja}>Bandeja de Entrada</button>}
            </div>
            {modalState && vistaAddProd && <AddProduct/>}
            {modalState && addUser && <AddUser/>}
            {modalState && vistaProd && <ProductTable/>}
            {modalState && EditAmount && <ProductAmountTable/>}
            {modalState && vistaUser && <UserTable/>}
            {modalState && bandeja && <Bandeja/>}

            {modalState && vistaUser && <button className="button_finish" onClick={cerrarVistaUser}>Cerrar Ver Usuarios</button>}
            {modalState && vistaAddProd && <button className="button_finish" onClick={cerrarVistaAdd}>Cerrar Vista de Agregado</button>}
            {modalState && vistaProd && <button className="button_finish" onClick={cerrarVistaProd}>Cerrar Vista de Productos</button>}
            {modalState && EditAmount && <button className="button_finish" onClick={cerrarEditAmount}>Cerrar Edicion de Stock</button>}
            {modalState && addUser && <button className="button_finish" onClick={cerrarAddUser}>Cerrar Agregar Usuario</button>}
            {modalState && bandeja && <button className="button_finish" onClick={cerrarBandeja}>Cerrar Bandeja de Comentarios</button>}

          </div>
        </>
    )
}
export default AdminPanel