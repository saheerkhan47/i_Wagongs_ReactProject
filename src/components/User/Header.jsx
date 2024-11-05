import React, { useContext } from 'react';
import { mycontext } from './Mycontext';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';


export function Header({ searchQuery, handleSearch, handleChange, categories, cartCount }) {
    const { loginStatus, setLoginStatus } = useContext(mycontext);
    const nav = useNavigate();

    function handleLogout() {
        setLoginStatus(false);
        nav('/login');
    }
    

    return (
        <div className="i-index">
            <div className="input-boxs">
                <input
                    type="text"
                    placeholder="Search.."
                    value={searchQuery}
                    onChange={handleSearch}
                    aria-label="Search items"
                />
            </div>

            <select className="select-option" onChange={handleChange} aria-label="Select category">
                <option value="">Select category</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
            </select>

            <div className="i-logo" id="ilogo">
                <h2>i Wag<i className="fa-brands fa-apple"></i>ns</h2>
            </div>

            <div className="i-links">
                {loginStatus ? (
                    <Link to="/" onClick={handleLogout} aria-label="Logout">
                        <h5><i className="fa-solid fa-right-from-bracket"></i></h5>
                    </Link>
                ) : (
                    <Link to="/login" aria-label="Login">
                        <h5><i className="fa-solid fa-user"></i></h5>
                    </Link>
                )}

                <Link to="/wishlist" aria-label="Wishlist"><h5><i className="fa-solid fa-heart"></i></h5></Link>
                <Link to="/addtocart" aria-label="Shopping Cart">
                    <h5><i className="fa-solid fa-cart-shopping"></i>
                        {cartCount > 0 && <span>{cartCount}</span>}
                    </h5>
                </Link>
                <Link to="/admin/adminlogin" aria-label="Admin Login"><h5><i className="fa-solid fa-user-lock"></i></h5></Link>
            </div>
        </div>
    );
}
