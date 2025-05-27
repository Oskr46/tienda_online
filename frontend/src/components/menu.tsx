import React from "react";
import iconoInicio from "../assets/icono_inicio.png"
import iconoCarrito from "../assets/icono_carrito.png"
import iconoTelefono from "../assets/icono_telefono.png"
import iconoEmpleado from "../assets/user_icon.png"
import "../styles/menu.css"

interface itemsMenu{
    onNavigate: (page: 'Inicio' | 'Productos' | 'Contactos' | 'Empleados') => void;
}

const Menu: React.FC<itemsMenu> = ({ onNavigate }) => {
    return(
    <div>
        <button className="head_button" onClick={()=> onNavigate('Inicio')}>
            <img src={iconoInicio} alt="Inicio" width={45} height={45}></img>
            <br/>
            Inicio
        </button>
        <button className="head_button" onClick={()=> onNavigate('Productos')}>
            <img src={iconoCarrito} alt="Productos" width={45} height={45}></img>
            <br/>
            Productos
        </button>
        <button className="head_button" onClick={()=> onNavigate('Contactos')}>
        <img src={iconoTelefono} alt="Contactos" width={45} height={45}></img>
        <br/>
        Contactos
        </button>

        <button className="head_button" onClick={()=> onNavigate('Empleados')}>
        <img src={iconoEmpleado} alt="Login Empleados" width={45} height={45}></img>
        <br/>
        Empleados
        </button>
    </div>
    );
};
export default Menu;