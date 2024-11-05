import React from 'react'
import { useContext, useState, } from 'react';
import { mycontext } from '../User/Mycontext';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';


export function AddProducts() {

    const { ProData, setProData } = useContext(mycontext);

    const [newProduct, setNewProduct] = useState({
        id: "",
        name: "",
        image: "",
        category: "",
        price: 0,

    });

    const nav = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedProducts = [...ProData, newProduct];
        setProData(updatedProducts);
        console.log(updatedProducts);

        setNewProduct({
            id: "",
            title: "",
            image: "",
            category: "",
            price: 0,
            qty: 1
        });
        nav('/admin/productview')
    };

    function handleCancelpro() {
        setNewProduct(null); 
        setNewProduct({});
        nav('/admin')
    }


    return (
        <>
            <h2 style={{ textAlign: "center" }}>Add i Products</h2><hr />
            <Link to="/admin" style={{ marginLeft: "1rem" }}>
                <Button variant="dark"><i class="fa-solid fa-arrow-left"></i></Button>
            </Link>

            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <div className="pro-card">
                    <div className="card" style={{ width: "18rem" }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', paddingLeft: "15px" }}>

                            <label>
                               Product Id:
                                <input
                                    type="text"
                                    value={newProduct.id}
                                    onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                                    style={{ width: '90%', padding: '5px' }}
                                />
                            </label>
                            <label>
                                Image Url:
                                <input
                                    type="text"
                                    value={newProduct.image}
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                    style={{ width: '90%', padding: '5px' }}
                                />
                            </label>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    style={{ width: '90%', padding: '5px' }}
                                />
                            </label>
                            <label>
                                Category:
                                <input
                                    type="text"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    style={{ width: '90%', padding: '5px' }}
                                />
                            </label>
                            <label>
                                Price:
                                <input
                                    type="number"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
                                    style={{ width: '90%', padding: '5px' }}
                                />
                            </label>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: "10px", marginLeft:"5rem" }}>
                                <Button variant='outline-danger' onClick={handleCancelpro}><i class="fa-solid fa-xmark"></i></Button>
                                <Button variant="outline-success" onClick={handleSubmit}><i class="fa-solid fa-check"></i></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
