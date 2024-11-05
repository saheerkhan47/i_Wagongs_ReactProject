import React from 'react'
import { mycontext } from './Mycontext'
import { useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { useState } from 'react'

import "./Indexs.css"

export function CategoryList() {

  const nav=useNavigate();

  const { product, like, setLike, Add, setAdd, loginStatus } = useContext(mycontext);
  const { category } = useParams()   //get the url parametrs
  const [cartCount, setCartCount] = useState(0);


  const Items = product.filter(item => item.category === category)

  console.log("category", Items);



  function handlelike(products) {
    if (!loginStatus) {    // "!" add condition work correclty
      alert('Please login to add items to the wishlist.');
      nav('/login')
      return;
    }
    if (like.includes(products)) {
      alert('Product is already in the wishlist.');
      setLike(like.filter(item => item !== products))
    }
    else {
      setLike([...like, products])
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
      alert('Product is already in the cart.');
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
      <h2 style={{ textAlign: "center" }}>CategoryWise Products</h2><hr />
      <Link to="/" style={{ marginLeft: "1rem" }}>
        <Button variant="dark"><i class="fa-solid fa-arrow-left"></i></Button>
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", paddingTop: "30px" }}>
      <div className="pro-card">
        {
          Items.map((menu) =>
            <div className="card product-card" style={{ width: "18rem" }}>
              <img src={menu.image} className="card-img-top" height={250} alt="product-image" />
              <div className="card-body">
                <h5 className="card-title">{menu.name}</h5>
                <p className="card-text">{menu.category}</p>
                <p className="card-text">₹{menu.price} </p>
                <button style={{ margin: "5px" }} className="btn btn-dark" onClick={() => handlelike(menu)}><i className={like.includes(menu)
                    ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                  </button>
                  <button
                    style={{
                      backgroundColor: Add.includes(menu) ? "green" : "grey"
                    }} className="btn btn-dark" onClick={() => handleAddtocart(menu)}><i className={Add.includes(menu)
                      ? "fa-solid fa-cart-plus" : "fa-solid fa-cart-shopping"}></i>
                  </button>
              </div>
            </div>
          )
        }
      </div>
      </div>
    </>
  )
}
