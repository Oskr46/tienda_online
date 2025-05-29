import React from "react";

interface Props{
    idProduct:number,
    refresh: () => void;
}

const DeleteProduct: React.FC<Props> = ({idProduct, refresh}) => {
    const handleDelete = async() => {
        console.log(idProduct)
        await fetch(`http://localhost:3001/api/products/${idProduct}`,{
            method:'DELETE'
        });
        refresh();
    };

    return(
        <>
            <div>
                <button className="button_finish" onClick={handleDelete}>Eliminar</button>
            </div>
        </>
    );
};

export default DeleteProduct;