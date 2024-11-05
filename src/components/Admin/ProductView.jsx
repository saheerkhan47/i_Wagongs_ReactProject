import React, { useState } from 'react';
import { mycontext } from '../User/Mycontext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './productview.css'

export function ProductView() {
    const { ProData, setProData } = useContext(mycontext);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState({});


    function handleEdit(index, value) {
        setEditIndex(index);
        setEditValue(value);
    }


    function handleSaveEdit(index) {
        const editedData = [...ProData];
        editedData[index] = editValue;
        setProData(editedData);
        setEditIndex(null);
    }

    function handleCancelEdit() {
        setEditIndex(null);
        setEditValue({});
    }


    function handleDelete(index) {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const deletedData = [...ProData];
            deletedData.splice(index, 1);
            setProData(deletedData);
        }
    }

    return (
        <>
            <h2 style={{ textAlign: "center" }}>i Products</h2><hr />
            <Link to="/admin" style={{ marginLeft: "1rem" }}>
                <Button variant="dark"><i class="fa-solid fa-arrow-left"></i></Button>
            </Link><br /><br />

            <div className="add-product-container">
                <Link to="/admin/addproducts">
                    <Button variant="dark">
                        <i className="fa-solid fa-plus"></i>
                    </Button>
                </Link>
            </div>

            <div className="pro-card">

                {ProData.map((data, index) => (
                    <div key={data.id} className="card" style={{ width: "18rem" }}>
                        <img src={data.image} className="card-img-top" height={250} alt="Product-image" />

                        {editIndex === index ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', paddingLeft: "15px" }}>

                                <label>
                                    Image:
                                    <input
                                        type="text"
                                        value={editValue.image}
                                        onChange={(e) => setEditValue({ ...editValue, image: e.target.value })}
                                        style={{ width: '90%', padding: '5px' }}
                                    />
                                </label>

                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        value={editValue.name}
                                        onChange={(e) => setEditValue({ ...editValue, name: e.target.value })}
                                        style={{ width: '90%', padding: '5px' }}
                                    />
                                </label>

                                <label>
                                    Category:
                                    <input
                                        type="text"
                                        value={editValue.category}
                                        onChange={(e) => setEditValue({ ...editValue, category: e.target.value })}
                                        style={{ width: '90%', padding: '5px' }}
                                    />
                                </label>
                                <label>
                                    Price:
                                    <input
                                        type="number"
                                        value={editValue.price}
                                        onChange={(e) => setEditValue({ ...editValue, price: e.target.value })}
                                        style={{ width: '90%', padding: '5px' }}
                                    />
                                </label>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: "10px" }}>
                                    <Button variant='outline-danger' onClick={handleCancelEdit}><i class="fa-solid fa-xmark"></i></Button>
                                    <Button variant="outline-success" onClick={() => handleSaveEdit(index)}><i class="fa-solid fa-check"></i></Button>
                                </div>
                            </div>
                        ) : (
                            <div className="card-body">
                                <h5 className="card-title">{data.name}</h5>
                                <p className="card-text">{data.category}</p>
                                <p className="card-text">₹{data.price} </p>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <Link to="/admin" style={{ marginLeft: "1rem" }}>
                                        <Button variant="dark"><i class="fa-solid fa-arrow-left"></i></Button>
                                    </Link>
                                    <Button onClick={() => handleEdit(index, data)} variant="outline-secondary"><i class="fa-solid fa-pen-to-square"></i></Button>
                                    <Button variant='outline-danger' onClick={() => handleDelete(index)}><i class="fa-solid fa-xmark"></i></Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

