import React from "react";
import { Stage, Layer, Image as KonvaImage} from 'react-konva';

 interface Product{
    idProduct: number;
    nameProduct: string;
    priceProduct: number;
    maxStock: number;
    minStock: number;
    stockAmount: number;
    urlImg: string;
  }

interface productsDetailsProps{
    product: Product;
    onBack: () => void;
}

const ProductosDetalles: React.FC <productsDetailsProps> = ({ product, onBack }) =>{
    const [image, setImage] = React.useState<HTMLImageElement | null> (null);
    React.useEffect(()=>{
        const img = new Image();
        img.src = `http://localhost:3002${product.urlImg}`;
        const handleLoad = ()=>{
            setImage(img);
        };
        img.onload = handleLoad;

        return() => {
            img.onload=null;
        };
    },[product.urlImg]);

    return(
        <div>
            <div>
                <h3>Producto: <br></br><u>{product.nameProduct}</u></h3>
            </div>
        <div>
            <div>
                <div>
                    <Stage height={300} width={300}>
                        <Layer>
                            {image && (<KonvaImage image = {image} x={0} y={0} height={300} width={300}/>)}
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
        <div>
            <h3>Price:</h3>
            <p>{product.priceProduct}</p>
        </div>
        <button className="button" onClick={onBack}>Volver</button>
        </div>
    );
};
export default ProductosDetalles;