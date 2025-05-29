interface Comentario {
    idCommentary: number,
    nameCommentary: string,
    emailCommentary: string,
    textCommentary: string,
    valoration: number,
    idProduct: number
};


interface DetalleComentarioProps {
    comentario: Comentario;
    onVolver: () => void;
}

function DetalleComentario({ comentario, onVolver }: DetalleComentarioProps) {
    return (
        <div className="detalle-container">
            <button className="volver-btn" onClick={onVolver}>← Volver a la lista</button>
            
            <div className="detalle-comentario">
                <h2>Detalle del Comentario</h2>
                
                <div className="detalle-header">
                    <div>
                        <p><strong>Nombre:</strong> {comentario.nameCommentary}</p>
                        <p><strong>Email:</strong> {comentario.emailCommentary}</p>
                        <p><strong>Producto ID:</strong> {comentario.idProduct}</p>
                    </div>
                    
                    <div className="detalle-rating">
                        <p><strong>Calificación:</strong></p>
                        <div className="rating-estrellas">
                            {Array(5).fill().map((_, i) => (
                                <span key={i} className={`estrella ${i < comentario.valoration ? 'llena' : 'vacia'}`}>★</span>
                            ))}
                            <span className="rating-numero">({comentario.valoration}/5)</span>
                        </div>
                    </div>
                </div>
                
                <div className="detalle-texto">
                    <h3>Comentario:</h3>
                    <p>{comentario.textCommentary}</p>
                </div>
            </div>
        </div>
    )
}

export default DetalleComentario