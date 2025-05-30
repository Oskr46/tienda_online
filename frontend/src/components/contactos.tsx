import React from "react";
import "../styles/App.css";

const Contactos: React.FC = () => {
    return(
        <div className="contact-container">
            <div className="contact-header">
                <h2>Contáctanos</h2>
                <p className="contact-subtitle">Estamos aquí para ayudarte</p>
            </div>
            
            <div className="contact-content">
                <div className="contact-methods">
                    <div className="contact-card email-card">
                        <div className="contact-icon">✉️</div>
                        <h3>Correo Electrónico</h3>
                        <p>Para consultas generales:</p>
                        <a href="mailto:oscarraf64@gmail.com" className="contact-link">
                            oscarraf64@gmail.com
                        </a>
                    </div>
                    
                    <div className="contact-card phone-card">
                        <div className="contact-icon">📞</div>
                        <h3>Teléfono</h3>
                        <p>Horario de atención:</p>
                        <p className="contact-info">Lunes a Viernes, 9:00 - 18:00</p>
                        <a href="tel:+1234567890" className="contact-link">
                            +1 (234) 567-890
                        </a>
                    </div>
                    
                    <div className="contact-card address-card">
                        <div className="contact-icon">📍</div>
                        <h3>Dirección</h3>
                        <p>Visítanos en:</p>
                        <p className="contact-info">
                            Av. Principal 1234<br />
                            Ciudad, País
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contactos;