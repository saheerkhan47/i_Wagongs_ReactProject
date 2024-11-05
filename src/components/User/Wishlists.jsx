import { Button } from "react-bootstrap";
import { mycontext } from './Mycontext';
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { Header } from "./Header";



export function Wishlists() {

    const { like, setLike, Add, setAdd, loginStatus } = useContext(mycontext)
    const [cartCount, setCartCount] = useState(0);


    const nav = useNavigate();


    function handleRemove(products) {
        setLike(like.filter(item => item !== products))
    }

    function confirmRemove(products) {
        if (window.confirm(`Are you sure you want to remove "${products.name}" from Wishlit?`)) {
            handleRemove(products)
        }
    }


    useEffect(() => {
        setCartCount(Add.length);
    }, [Add]);

    function handleAddtocart(products) {
        if (!loginStatus) {
            alert('Please log in to add items to the cart.');
            nav('/login');
            return;
        }
        if (Add.includes(products)) {
            // alert('Product is already in the cart.');
            setAdd(Add.filter(item => item !== products));
            setCartCount(cartCount - 1);
        }
        else {
            setAdd([...Add, products])
            setCartCount(cartCount + 1)
        }
    }

    return (
        <>
            <h4 style={{ textAlign: "center" }}>Your WishListed</h4><hr />
            <Link to="/" style={{ marginLeft: "1rem" }}>
                <Button variant="dark"><i class="fa-solid fa-arrow-left"></i></Button>
            </Link>
            <div className="pro-card">
                {like.length > 0 ? (
                    like.map((menu) => (
                        <div className="card product-card" style={{ width: "18rem" }}>
                            <img src={menu.image} className="card-img-top" height={250} alt="food-image" />
                            <div className="card-body">
                                <h5 className="card-title">{menu.name}</h5>
                                <p className="card-text">{menu.category}</p>
                                <p className="card-text">Rs:{menu.price} </p>
                                <Button variant="outline-danger" style={{ margin: "5px" }} onClick={() => confirmRemove(menu)} ><i class="fa-solid fa-xmark"></i></Button>
                                <button
                                    style={{
                                        backgroundColor: Add.includes(menu) ? "green" : "grey"
                                    }} className="btn btn-dark" onClick={() => handleAddtocart(menu)}><i className={Add.includes(menu)
                                        ? "fa-solid fa-cart-plus" : "fa-solid fa-cart-shopping"}></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="empty-cart-message">Your Wishlist is empty.</p>
                )}
            </div>
        </>
    )
}

