import React, { useState, useEffect } from 'react';
import EditProduct from './editProduct';
import DeleteProduct from './deleteProduct';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import '../../styles/productTable.css';

interface Product {
  idProduct: number;
  nameProduct: string;
  priceProduct: string;
  maxStockProduct: string;
  minStockProduct: string;
  stockProduct: string;
  urlImg: string;
  originalImgUrl?: string;
}

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

const fetchImage = async (url: string): Promise<string> => {
  try {
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
    return '';
  }
};

const ProductsPDFDocument = ({ products }: { products: Product[] }) => (
  <Document>
    <Page style={pdfStyles.page} size="A4">
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>LECTROMART C.A</Text>
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
      setError(null);
      
      const response = await fetch('http://localhost:3002/api/product/data', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }
      
      const data = await response.json();
      
      let productsData = [];
      if (Array.isArray(data)) {
        productsData = data;
      } else if (data.data && Array.isArray(data.data)) {
        productsData = data.data;
      } else if (data && typeof data === 'object' && !Array.isArray(data)) {
        productsData = [data];
      }
      
      if (productsData.length === 0) {
        setProducts([]);
        return;
      }
      
      const productsWithImages = await Promise.all(
        productsData.map(async (product: Product) => {
          try {
            const imageBase64 = product.urlImg ? await fetchImage(product.urlImg) : '';
            return {
              ...product,
              urlImg: imageBase64,
              originalImgUrl: product.urlImg
            };
          } catch (error) {
            console.error('Error procesando imagen del producto:', error);
            return {
              ...product,
              urlImg: '',
              originalImgUrl: product.urlImg
            };
          }
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
    return <div className="loading-state">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="empty-state">No hay productos registrados en la base de datos</div>;
  }

  return (
    <div className="product-table-container">
      <div className="product-table-header">
        <h2 className="product-table-title">Lista de Productos</h2>
        <PDFDownloadLink
          document={<ProductsPDFDocument products={products} />}
          fileName={`reporte_productos_${new Date().toISOString().slice(0, 10)}.pdf`}
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
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.idProduct}>
              <td>{product.idProduct}</td>
              <td>{product.nameProduct}</td>
              <td>${product.priceProduct}</td>
              <td>{product.stockProduct} / {product.maxStockProduct}</td>
              <td>
                {product.originalImgUrl && (
                  <img 
                    src={`http://localhost:3002${product.originalImgUrl}`}
                    className="product-image"
                    alt={product.nameProduct}
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
              </td>
              <td>
                <div className="actions-container">
                  <EditProduct productos={product} refresh={refreshProducts} />
                  <DeleteProduct idProduct={product.idProduct} refresh={refreshProducts} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;