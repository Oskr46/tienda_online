import { useState } from "react";
import axios from "axios";
import "../../styles/login.css";
import AdminPanel from "./adminPanel";
import GerentePanel from "./GerentePanel";
import AnalistaPanel from "./AnalistaPanel";

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

function LoginModule() {
  const [info, setInfo] = useState<UserData | null>(null);
  const [userName, setUserName] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const getUserRoleName = (typeUser: number): string => {
    switch(typeUser) {
      case UserType.Administrador: return "Administrador";
      case UserType.Gerente: return "Gerente";
      case UserType.Analista: return "Analista";
      default: return "Rol desconocido";
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
        setMensaje('');
        setUserName('');
        setInfo(respuesta.data.data);
      } else {
        setClave('');
        setUserName('');
        setMensaje("Credenciales inválidas");
        setInfo(null);
      }
    } catch (err) {
      setMensaje(`Error en el servidor: ${err instanceof Error ? err.message : String(err)}`);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const renderUserDashboard = () => {
    if (!info) return null;

    switch(info.typeUser) {
      case UserType.Administrador: return <AdminPanel/>;
      case UserType.Gerente: return <GerentePanel/>;
      case UserType.Analista: return <AnalistaPanel/>;
      default: return <p>Rol no reconocido</p>;
    }
  };

  return (
    <div className="login-container">
      {!info ? (
        <div className="login-form">
          <div className="login-header">
            <h2>Inicio de Sesión</h2>
            <p className="login-subtitle">Acceso para empleados</p>
          </div>
          
          {mensaje && <div className="login-message">{mensaje}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              placeholder="Ingrese su usuario"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password" 
              value={clave} 
              onChange={(e) => setClave(e.target.value)} 
              placeholder="Ingrese su contraseña"
              disabled={loading}
            />
          </div>
          
          <button 
            className="login-button" 
            onClick={HandleLoginUser} 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Cargando...
              </>
            ) : "Iniciar Sesión"}
          </button>
        </div>
      ) : (
        <div className="user-dashboard">
          <div className="user-header">
            <h2>
              <span className="user-role">{getUserRoleName(info.typeUser)}</span>
              <span className="user-name">{info.fullNameUser}</span>
            </h2>
          </div>
          
          {renderUserDashboard()}
          
          <button 
            className="logout-button" 
            onClick={() => setInfo(null)}
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginModule;