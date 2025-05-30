import { useState, useEffect } from 'react';
import EditUser from './editUser';
import DeleteUser from './deleteUser';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import '../../styles/productTable.css'; // Reutilizando el CSS existente

interface User {
  idUser: number;
  fullNameUser: string;
  userName: string;
  typeUser: number;
}

// Estilos optimizados para PDF de usuarios (se mantienen igual)
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#0e0f11'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff'
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#333333'
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableColHeader: {
    width: '33%',
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderBottom: '1px solid #333333',
    borderRight: '1px solid #333333'
  },
  tableCol: {
    width: '33%',
    padding: 10,
    backgroundColor: '#0e0f11',
    borderBottom: '1px solid #333333',
    borderRight: '1px solid #333333'
  },
  tableCellHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4d9eff'
  },
  tableCell: {
    fontSize: 10,
    color: '#ffffff'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#a0a0a0'
  }
});

const UsersPDFDocument = ({ users }: { users: User[] }) => (
  <Document>
    <Page style={pdfStyles.page} size="A4">
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>REPORTE DE USUARIOS</Text>
      </View>
      
      <View style={pdfStyles.table}>
        <View style={pdfStyles.tableRow}>
          <View style={pdfStyles.tableColHeader}>
            <Text style={pdfStyles.tableCellHeader}>Nombre Completo</Text>
          </View>
          <View style={pdfStyles.tableColHeader}>
            <Text style={pdfStyles.tableCellHeader}>Usuario</Text>
          </View>
          <View style={pdfStyles.tableColHeader}>
            <Text style={pdfStyles.tableCellHeader}>Tipo</Text>
          </View>
        </View>
        
        {users.map((user) => (
          <View style={pdfStyles.tableRow} key={user.idUser}>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>{user.fullNameUser}</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>{user.userName}</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>
                {user.typeUser === 0 ? 'Administrador' : 
                 user.typeUser === 1 ? 'Gerente' : 'Analista'}
              </Text>
            </View>
          </View>
        ))}
      </View>
      
      <Text style={pdfStyles.footer}>
        Generado el {new Date().toLocaleDateString()} • Total usuarios: {users.length}
      </Text>
    </Page>
  </Document>
);

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3002/api/user/data', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }
      
      const data = await response.json();
      
      let usersData = [];
      if (Array.isArray(data)) {
        usersData = data;
      } else if (data.data && Array.isArray(data.data)) {
        usersData = data.data;
      } else if (data && typeof data === 'object' && !Array.isArray(data)) {
        usersData = [data];
      }
      
      setUsers(usersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error al cargar usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const refreshUsers = () => {
    fetchUsers();
  };

  if (loading) {
    return <div className="loading-state">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  if (!users || users.length === 0) {
    return <div className="empty-state">No hay usuarios registrados en la base de datos</div>;
  }

  return (
    <div className="product-table-container">
      <div className="product-table-header">
        <h2 className="product-table-title">Lista de Usuarios</h2>
        <PDFDownloadLink
          document={<UsersPDFDocument users={users} />}
          fileName={`reporte_usuarios_${new Date().toISOString().slice(0, 10)}.pdf`}
        >
          {({ loading }) => (
            <button className="pdf-download-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generando PDF...
                </>
              ) : 'Descargar Reporte'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
      
      <table className="products-table">
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Usuario</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idUser}>
              <td>{user.fullNameUser}</td>
              <td>{user.userName}</td>
              <td>
                {user.typeUser === 0 ? 'Administrador' : 
                 user.typeUser === 1 ? 'Gerente' : 'Analista'}
              </td>
              <td>
                <div className="actions-container">
                  <EditUser user={user} refresh={refreshUsers} />
                  <DeleteUser idUser={user.idUser} refresh={refreshUsers} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;