import ProductosItem from "./productosItems";
import ProductosDetalles from "./productosDetalles";

 interface Product{
    idProduct: number;
    nameProduct: string;
    priceProduct: number;
    maxStock: number;
    minStock: number;
    stockAmount: number;
    urlImg: string;
  }

interface productsProp{
    products: Product[];
    onSelectProduct: (products:Product | null) => void;
    selectedProduct: Product | null;
}

const VistaProdGeneral: React.FC <productsProp> = ({products, onSelectProduct, selectedProduct}) => {
  return (
    <>
      <div>
                  <h2>Listado de Productos</h2>
                  <div className="productos">
                      {!selectedProduct ? (
                          <div className="producto">
                                  {products.map((product)=>(
                                  <div className="contenedor">
                                      <ProductosItem key={product.idProduct} product={product} onSelect={onSelectProduct}/>
                                  </div>
                                  ))}
                          </div>
                          ) : (
                              <ProductosDetalles product={selectedProduct} onBack={()=> onSelectProduct(null)}/>
                      )}
                  </div>
              </div>
    </>
  );
}

export default VistaProdGeneral
