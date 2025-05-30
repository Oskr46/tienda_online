import { useState, useEffect } from "react";
import DetalleComentario from "./detailCommentary";
import "../../styles/bandeja.css";

interface Comentario {
    idCommentary: number;
    nameCommentary: string;
    emailCommentary: string;
    textCommentary: string;
    valoration: number;
    idProduct: number;
};

function Bandeja() {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [comentarioSeleccionado, setComentarioSeleccionado] = useState<Comentario | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                setCargando(true);
                setError(null);
                
                const response = await fetch("http://localhost:3002/api/commentary/");
                
                if (!response.ok) {
                    throw new Error("Error al cargar los comentarios");
                }

                const data = await response.json();
                
                // Asegurar que siempre sea un array, incluso si viene null/undefined
                const comentariosData = Array.isArray(data) ? data : [];
                setComentarios(comentariosData);
                
            } catch (err) {
                console.error("Error al cargar comentarios:", err);
                setError(err instanceof Error ? err.message : "Error desconocido");
                setComentarios([]); // Asegurar array vacío en caso de error
            } finally {
                setCargando(false);
            }
        };

        fetchComentarios();
    }, []);

    const handleVolverALista = () => {
        setComentarioSeleccionado(null);
    };

    if (comentarioSeleccionado) {
        return <DetalleComentario comentario={comentarioSeleccionado} onVolver={handleVolverALista} />;
    }

    return (
        <div className="bandeja-container">
            <h1 className="bandeja-titulo">Bandeja de Comentarios</h1>
            
            {cargando ? (
                <p className="cargando">Cargando comentarios...</p>
            ) : error ? (
                <p className="error">Error: {error}</p>
            ) : (
                <div className="lista-comentarios">
                    {/* Manejo seguro del array con operador && y verificación de length */}
                    {comentarios && comentarios.length > 0 ? (
                        comentarios.map((comentario) => (
                            <div 
                                key={comentario.idCommentary} 
                                className="comentario-tarjeta"
                                onClick={() => setComentarioSeleccionado(comentario)}
                            >
                                <div className="comentario-header">
                                    <span className="comentario-nombre">{comentario.nameCommentary}</span>
                                    <span className="comentario-email">{comentario.emailCommentary}</span>
                                    <div className="comentario-rating">
                                        {Array(5).fill().map((_, i) => (
                                            <span 
                                                key={i} 
                                                className={`estrella ${i < comentario.valoration ? 'llena' : 'vacia'}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="comentario-preview">
                                    {comentario.textCommentary.substring(0, 100)}...
                                </p>
                                <span className="comentario-producto-id">
                                    Producto ID: {comentario.idProduct}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="bandeja-vacia-mensaje">
                            <p>La bandeja de entrada se encuentra vacía</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Bandeja;