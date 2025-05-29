import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  table: { display: "flex", flexDirection: "column", width: "100%" },
  row: { flexDirection: "row", borderBottom: "1px solid #eee", padding: 5 },
  header: { fontWeight: "bold", backgroundColor: "#f2f2f2" },
  cell: { width: "25%", padding: 5 }
});

const ProductPDF = ({ products }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Reporte de Productos</Text>
      <View style={styles.table}>
        <View style={[styles.row, styles.header]}>
          <Text style={styles.cell}>ID</Text>
          <Text style={styles.cell}>Nombre</Text>
          <Text style={styles.cell}>Precio</Text>
          <Text style={styles.cell}>Stock</Text>
        </View>
        {products.map((product) => (
          <View style={styles.row} key={product.id}>
            <Text style={styles.cell}>{product.id}</Text>
            <Text style={styles.cell}>{product.name}</Text>
            <Text style={styles.cell}>${product.price}</Text>
            <Text style={styles.cell}>{product.stock}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);