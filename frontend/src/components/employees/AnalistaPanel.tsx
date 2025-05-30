import { useState } from 'react';
import ProductAmountTable from '../products/editAmountProdTable';
import '../../styles/login.css';
import Bandeja from './bandeja';

function AnalistaPanel() {
  const [currentView, setCurrentView] = useState<string | null>(null);

  const views = {
    inventory: 'Gestionar Inventario',
    inbox: 'Bandeja de Entrada'
  };

  const renderView = () => {
    switch(currentView) {
      case views.inventory: return <ProductAmountTable />;
      case views.inbox: return <Bandeja />;
      default: return null;
    }
  };

  return (
    <div className="admin-panel">
      <div className="panel-header">
        <h2>Panel de Analista</h2>
        <p className="panel-subtitle">Gestión de inventario y comentarios</p>
      </div>

      {!currentView ? (
        <div className="panel-options">
          <h3>Elija una opción:</h3>
          <div className="options-grid">
            <button className="panel-button" onClick={() => setCurrentView(views.inventory)}>
              Gestionar Inventario
            </button>
            <button className="panel-button" onClick={() => setCurrentView(views.inbox)}>
              Bandeja de Entrada
            </button>
          </div>
        </div>
      ) : (
        <div className="panel-view">
          <div className="view-header">
            <h3>{currentView}</h3>
            <button 
              className="panel-close-button" 
              onClick={() => setCurrentView(null)}
            >
              Volver al menú
            </button>
          </div>
          {renderView()}
        </div>
      )}
    </div>
  );
}

export default AnalistaPanel;