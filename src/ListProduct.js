import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import axios from "axios";

const ListProduct = ({ productos, setProductos }) => {

    const deleteProduct = (id) => {
        axios.delete(`https://react-products-back-production.up.railway.app/api/products/product/delete/${id}`)
            .then(() => {
                setProductos(productos.filter((pro) => pro._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("https://react-products-back-production.up.railway.app/api/products/")
                .then(({ data }) => {
                    setProductos(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000);

        return () => clearInterval(interval);
    }, [setProductos]);

    return (
        <>
            {/* <center className="mt-3"><h2 className="blue">sa sa - M5B</h2></center> */}
            <h3 className="mb-3 mt-2">Lista de Productos</h3>
            {productos.map((pro) => (
                <div className="mb-3 border rounded p-3" key={pro._id}>
                    <div className="d-flex justify-content-between mb-1">
                        <div className="fw-bold">{pro.name}</div>
                        <div className="text-muted small">
                            {/* <FontAwesomeIcon icon={faEdit} className="cursor-pointer" /> */}
                            <FontAwesomeIcon icon={faTrash} className="cursor-pointer ms-2" onClick={() => deleteProduct(pro._id)} />
                        </div>
                    </div>
                    <div>
                        <div >
                            <small>Costo: {pro.price}</small>
                        </div>
                        <div>
                            <small>
                                Fecha de caducidad:{" "}
                                {new Date(pro.expiry_date).toLocaleDateString()}
                            </small>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ListProduct;