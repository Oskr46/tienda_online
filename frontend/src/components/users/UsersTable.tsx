import { useState, useEffect } from 'react';
import EditUser from './editUser';
import DeleteUser from './deleteUser';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface User {
  idUser: number;
  fullNameUser: string;
  userName: string;
  typeUser: number;
}

// Estilos optimizados para PDF de usuarios
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
      const response = await fetch('http://localhost:3002/api/user/data');
      
      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data.data || data);
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
    return <div style={{ padding: 20, textAlign: 'center', color: '#ffffff' }}>Cargando usuarios...</div>;
  }

  if (error) {
    return <div style={{ padding: 20, textAlign: 'center', color: '#ff6b6b' }}>Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div style={{ padding: 20, textAlign: 'center', color: '#a0a0a0' }}>No hay usuarios registrados</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <PDFDownloadLink
          document={<UsersPDFDocument users={users} />}
          fileName={`reporte_usuarios_${new Date().toISOString().slice(0, 10)}.pdf`}
        >
          {({ loading, error }) => (
            <button 
              style={{
                padding: '12px 20px',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                border: '1px solid #333333',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                ':hover': {
                  borderColor: '#4d9eff',
                  boxShadow: '0 0 8px rgba(77, 158, 255, 0.5)'
                }
              }}
              disabled={loading}
            >
              {loading ? 'Generando PDF...' : 'Descargar Reporte'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
      
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        border: '1px solid #333333'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#1a1a1a' }}>
            <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #333333', color: '#4d9eff' }}>Nombre</th>
            <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #333333', color: '#4d9eff' }}>Usuario</th>
            <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #333333', color: '#4d9eff' }}>Tipo</th>
            <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #333333', color: '#4d9eff' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idUser} style={{ borderBottom: '1px solid #333333' }}>
              <td style={{ padding: 12, color: '#ffffff' }}>{user.fullNameUser}</td>
              <td style={{ padding: 12, color: '#ffffff' }}>{user.userName}</td>
              <td style={{ padding: 12, color: '#ffffff' }}>
                {user.typeUser === 0 ? 'Administrador' : 
                 user.typeUser === 1 ? 'Gerente' : 'Analista'}
              </td>
              <td style={{ padding: 12, display: 'flex', gap: 8 }}>
                <EditUser user={user} refresh={refreshUsers} />
                <DeleteUser idUser={user.idUser} refresh={refreshUsers} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;