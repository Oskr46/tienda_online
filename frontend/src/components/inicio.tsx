import React from "react";
import "../styles/App.css";

const Inicio: React.FC = () => (
    <div className='inicio-container'>
        <div className="inicio-hero">
            <h2>Bienvenido a LectroMart</h2>
            <p className="inicio-subtitle">Explora nuestra amplia selección de productos electrónicos</p>
            <button 
                className="inicio-button"
                onClick={() => window.scrollTo({ top: document.querySelector('.productos-container')?.offsetTop || 0, behavior: 'smooth' })}
            >
                Ver Productos
            </button>
        </div>
        
        <div className="inicio-features">
            <div className="feature-card">
                <div className="feature-icon">🚚</div>
                <h3>Envío Rápido</h3>
                <p>Recibe tus productos en 24-48 horas</p>
            </div>
            
            <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Pago Seguro</h3>
                <p>Transacciones protegidas</p>
            </div>
            
            <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Devoluciones Fáciles</h3>
                <p>30 días para cambiar de opinión</p>
            </div>
        </div>
    </div>
);

export default Inicio;