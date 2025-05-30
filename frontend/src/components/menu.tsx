import React from "react";
import iconoInicio from "../assets/icono_inicio.png";
import iconoCarrito from "../assets/icono_carrito.png";
import iconoTelefono from "../assets/icono_telefono.png";
import iconoEmpleado from "../assets/user_icon.png";
import "../styles/menu.css";

interface ItemsMenu {
    onNavigate: (page: 'Inicio' | 'Productos' | 'Contactos' | 'Empleados') => void;
    currentPage?: 'Inicio' | 'Productos' | 'Contactos' | 'Empleados';
}

const Menu: React.FC<ItemsMenu> = ({ onNavigate, currentPage }) => {
    const menuItems = [
        { id: 'Inicio', icon: iconoInicio, label: 'Inicio' },
        { id: 'Productos', icon: iconoCarrito, label: 'Productos' },
        { id: 'Contactos', icon: iconoTelefono, label: 'Contacto' },
        { id: 'Empleados', icon: iconoEmpleado, label: 'Empleados' }
    ];

    return (
        <nav className="menu-nav">
            <ul className="menu-list">
                {menuItems.map((item) => (
                    <li key={item.id} className="menu-item">
                        <button
                            className={`menu-button ${currentPage === item.id ? 'active' : ''}`}
                            onClick={() => onNavigate(item.id as any)}
                            aria-current={currentPage === item.id ? 'page' : undefined}
                        >
                            <img 
                                src={item.icon} 
                                alt={item.label}
                                className="menu-icon"
                            />
                            <span className="menu-text">{item.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;