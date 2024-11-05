import React, { useContext } from 'react';
import { mycontext } from './Mycontext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Header } from './Header';
import './addtocart.css';

export function Addtocart({ searchQuery, handleSearch, handleChange, categories }) {
    const { Add, setAdd } = useContext(mycontext);
    const nav = useNavigate();

    function handleRemove(product) {
        setAdd(prevAdd => prevAdd.filter(item => item !== product));
    }

    function confirmRemove(product) {
        if (window.confirm("Are you sure you want to remove this item?")) {
            handleRemove(product);
        }
    }

    function addQty(id) {
        setAdd(prevAdd =>
            prevAdd.map(item =>
                item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
            )
        );
    }

    function removeQty(id) {
        setAdd(prevAdd =>
            prevAdd.map(item =>
                item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
            )
        );
    }

    const calculateTotal = () => {
        return Add.reduce((total, item) => total + item.price * (item.qty || 1), 0);
    };

    const amount = calculateTotal();

    const handleNavigate = () => {
        nav("/payment", { state: amount });
    };

    return (
        <>
            <Header
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                handleChange={handleChange}
                categories={categories}
                cartCount={Add.length}  // Assuming cartCount is the length of Add
            />
            <br />
            {/* <h2 style={{ textAlign: "center" }}>My Cart</h2> */}
            {/* <hr /> */}
            <Link to="/" style={{ marginLeft: "1rem" }}>
                <Button variant="dark"><i className="fa-solid fa-arrow-left"></i></Button>
            </Link>
            
            <div className="pro-card">
                {Add.length > 0 ? (
                    Add.map(menu => (
                        <div className="card product-card" style={{ width: "18rem" }} key={menu.id}>
                            <img src={menu.image} className="card-img-top" height={250} alt="product-image" />
                            <div className="card-body">
                                <h5 className="card-title">{menu.name}</h5>
                                <p className="card-text">{menu.category}</p>
                                <p className="card-text" style={{ color: "grey" }}>₹{menu.price * (menu.qty || 1)}</p>
                                <h6>Qty : {menu.qty || 1}</h6>
                                <Button style={{ margin: "5px", borderRadius: "20px", paddingLeft: "15px" }} variant="outline-dark" onClick={() => removeQty(menu.id)}>-</Button>
                                <Button style={{ margin: "5px", borderRadius: "20px" }} variant="outline-dark" onClick={() => addQty(menu.id)}>+</Button>
                                <Button style={{ margin: "5px" }} variant="outline-danger" onClick={() => confirmRemove(menu)}><i className="fa-solid fa-xmark"></i></Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-cart-message">
                        <p>Your Cart is Empty</p><br />
                        {/* <Link to="/" className="btn btn-primary">Continue Shopping</Link> */}
                    </div>
                    
                )}
            </div>
            {Add.length > 0 && (
                <div className="payment-box" style={{ marginTop: "100px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", width: "100%" }}>
                    <div style={{ textAlign: "center", width: "100%" }}>
                        <h4 style={{ color: "green" }}>Total Amount: ₹{amount}</h4>
                        <Button variant="success" onClick={handleNavigate}>
                            <i className="fa-solid fa-bag-shopping"></i> CheckOut
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
