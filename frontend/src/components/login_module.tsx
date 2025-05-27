import { useState } from "react";
import axios from "axios";
import "../styles/login.css"

enum UserType {
  Administrador = 0,
  Gerente = 1,
  Analista = 2,
}

interface UserData {
  idUser: number;
  fullNameUser: string;
  userName: string;
  typeUser: number;
};

function App() {
  const [info, setInfo] = useState<UserData | null>(null);
  const [userName, setUserName] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const getUserRoleName = (typeUser: number): string => {
    switch(typeUser) {
      case UserType.Administrador:
        return "Administrador";
      case UserType.Gerente:
        return "Gerente";
      case UserType.Analista:
        return "Analista";
      default:
        return "Rol desconocido";
    }
  };

  const HandleLoginUser = async () => {
    if(!userName.trim() || !clave.trim()) {
      setMensaje("Por favor ingrese datos en TODOS los campos.");
      return;
    }

    setLoading(true);
    try {
      const respuesta = await axios.post(`http://localhost:3002/api/user/data/login`, {
        username: userName,
        clave: clave,
      });

      if(respuesta.data.success) {
        setClave('');
        setUserName('');
        setMensaje('Se ha encontrado un usuario con los siguientes datos');
        setInfo(respuesta.data.data);
      } else {
        setClave('');
        setUserName('');
        setMensaje("Credenciales Invalidas.");
        setInfo(null);
      }
    } catch (err) {
      setMensaje(`Error en el servidor: ${err instanceof Error ? err.message : String(err)}`);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // Determina qué vista mostrar según el tipo de usuario
  const renderUserDashboard = () => {
    if (!info) return null;

    switch(info.typeUser) {
      case UserType.Administrador:
        return (
          <div>
            <h3>Panel de Administrador</h3>
            <p>Acceso completo al sistema</p>
            {/* Contenido específico para admin */}
          </div>
        );
      case UserType.Gerente:
        return (
          <div>
            <h3>Panel de Gerente</h3>
            <p>Gestión de equipos y reportes</p>
            {/* Contenido específico para gerente */}
          </div>
        );
      case UserType.Analista:
        return (
          <div>
            <h3>Panel de Analista</h3>
            <p>Análisis de datos y reportes</p>
            {/* Contenido específico para analista */}
          </div>
        );
      default:
        return <p>Rol no reconocido</p>;
    }
  };

  return (
    <div>
      {!info ? (
        // Vista de login cuando no hay usuario autenticado
        <div>
          <h2>Inicio de Sesión para Empleados</h2>
          {mensaje && <p>{mensaje}</p>}
          <div>
            <input 
              className="input"
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              placeholder="Usuario"
            />
            <input 
              className="input"
              type="password" 
              value={clave} 
              onChange={(e) => setClave(e.target.value)} 
              placeholder="Clave"
            />
            <br/>
            <button className = "button" onClick={HandleLoginUser} disabled={loading}>
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </div>
        </div>
      ) : (
        // Vista después del login exitoso
        <div>
          <h2>Bienvenido, {info.fullNameUser}</h2>
          <p>Tipo de Usuario: {getUserRoleName(info.typeUser)}</p>
          
          {renderUserDashboard()}
          
          <button className = "button" onClick={() => setInfo(null)}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default App;