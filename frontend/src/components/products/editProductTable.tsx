import React, { useState, useEffect } from 'react';
import EditProduct from './editProduct';
import DeleteProduct from './deleteProduct';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface Product {
  idProduct: number;
  nameProduct: string;
  priceProduct: string;
  maxStockProduct: string;
  minStockProduct: string;
  stockProduct: string;
  urlImg: string;
}

// Estilos para el PDF
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
  subtitle: {
    fontSize: 12,
    color: '#a0a0a0'
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#333333',
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #333333'
  },
  tableColHeader: {
    width: '16%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#333333',
    padding: 8,
    backgroundColor: '#1a1a1a'
  },
  tableCol: {
    width: '16%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#333333',
    padding: 8,
    backgroundColor: '#0e0f11'
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4d9eff'
  },
  tableCell: {
    fontSize: 9,
    color: '#ffffff'
  },
  productImageContainer: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    alignContent: 'center',
    border: '1px solid #333333',
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
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

// Función para obtener imágenes con manejo de CORS
const fetchImage = async (url: string): Promise<string> => {
  try {
    // Si ya es una imagen en base64, retornarla directamente
    if (url.startsWith('data:image')) return url;
    
    const fullUrl = url.startsWith('http') ? url : `http://localhost:3002${url}`;
    
    const response = await fetch(fullUrl, {
      mode: 'cors',
      credentials: 'include'
    });
    
    if (!response.ok) throw new Error('Failed to fetch image');
    
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return ''; // Retorna cadena vacía si falla
  }
};

const ProductsPDFDocument = ({ products }: { products: Product[] }) => (
  <Document>
    <Page style={pdfStyles.page} size="A4">
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>REPORTE DE PRODUCTOS</Text>
        <Text style={pdfStyles.subtitle}>Inventario del Sistema</Text>
      </View>
      
      <View style={pdfStyles.table}>
        <View style={pdfStyles.tableRow}>
          <View style={pdfStyles.tableColHeader}>
            <Text style={pdfStyles.tableCellHeader}>Producto</Text>
          </View>
          <View style={pdfStyles.tableColHeader}>
            <Text style={pdfStyles.tableCellHeader}>Precio</Text>
          </View>
          <View style={pdfStyles.tableColHeader}>
            <Text style={pdfStyles.tableCellHeader}>Stock Máx</Text>
          </View>
          <View style={pdfStyles.tableColHeader}>
            <Text style={pdfStyles.tableCellHeader}>Stock Mín</Text>
          </View>
          <View style={pdfStyles.tableColHeader}>
            <Text style={pdfStyles.tableCellHeader}>Stock</Text>
          </View>
          <View style={pdfStyles.tableColHeader}>
            <Text style={pdfStyles.tableCellHeader}>Imagen</Text>
          </View>
        </View>
        
        {products.map((product) => (
          <View style={pdfStyles.tableRow} key={product.idProduct}>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>{product.nameProduct}</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>${product.priceProduct}</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>{product.maxStockProduct}</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>{product.minStockProduct}</Text>
            </View>
            <View style={pdfStyles.tableCol}>
              <Text style={pdfStyles.tableCell}>{product.stockProduct}</Text>
            </View>
            <View style={pdfStyles.productImageContainer}>
              {product.urlImg ? (
                <Image 
                  style={pdfStyles.productImage}
                  src={product.urlImg}
                  cache={false}
                />
              ) : (
                <Text style={pdfStyles.tableCell}>Sin imagen</Text>
              )}
            </View>
          </View>
        ))}
      </View>
      
      <Text style={pdfStyles.footer}>
        Generado el {new Date().toLocaleDateString()} • Total productos: {products.length}
      </Text>
    </Page>
  </Document>
);

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3002/api/product/data', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }
      
      const data = await response.json();
      const productsData = data.data || data;
      
      // Precargar imágenes como base64 para el PDF
      const productsWithImages = await Promise.all(
        productsData.map(async (product: Product) => {
          const imageBase64 = await fetchImage(product.urlImg);
          return {
            ...product,
            // Mantener ambas versiones: base64 para PDF y URL normal para la tabla
            urlImg: imageBase64,
            originalImgUrl: product.urlImg // Guardamos la URL original
          };
        })
      );
      
      setProducts(productsWithImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error al cargar productos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refreshProducts = () => {
    fetchProducts();
  };

  if (loading) {
    return <div style={{ padding: 20, textAlign: 'center', color: '#ffffff' }}>Cargando productos...</div>;
  }

  if (error) {
    return <div style={{ padding: 20, textAlign: 'center', color: '#ff6b6b' }}>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div style={{ padding: 20, textAlign: 'center', color: '#a0a0a0' }}>No hay productos registrados</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <PDFDownloadLink
          document={<ProductsPDFDocument products={products} />}
          fileName={`reporte_productos_${new Date().toISOString().slice(0, 10)}.pdf`}
        >
          {({ loading }) => (
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
            <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #333333', color: '#4d9eff' }}>ID</th>
            <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #333333', color: '#4d9eff' }}>Nombre</th>
            <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #333333', color: '#4d9eff' }}>Precio</th>
            <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #333333', color: '#4d9eff' }}>Imagen</th>
            <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #333333', color: '#4d9eff' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.idProduct} style={{ borderBottom: '1px solid #333333' }}>
              <td style={{ padding: 12, color: '#ffffff' }}>{product.idProduct}</td>
              <td style={{ padding: 12, color: '#ffffff' }}>{product.nameProduct}</td>
              <td style={{ padding: 12, color: '#ffffff' }}>${product.priceProduct}</td>
              <td style={{ padding: 12 }}>
                <img 
                  src={`http://localhost:3002${product.originalImgUrl || product.urlImg}`}
                  width={60} 
                  height={60} 
                  style={{ border: '1px solid #333333' }}
                  alt={product.nameProduct}
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </td>
              <td style={{ padding: 12, display: 'flex', gap: 8 }}>
                <EditProduct productos={product} refresh={refreshProducts} />
                <DeleteProduct idProduct={product.idProduct} refresh={refreshProducts} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;