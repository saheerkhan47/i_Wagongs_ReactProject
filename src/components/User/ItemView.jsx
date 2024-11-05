import React, { useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { mycontext } from './Mycontext'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import './itemview.css'


export function ItemView() {
  const { item } = useParams()
  const nav = useNavigate();

  const { product, like, setLike, Add, setAdd, loginStatus } = useContext(mycontext);
  const [cartCount, setCartCount] = useState(0);



  const PItem = product.find(data => data.id === Number(item));
  console.log("PItem", PItem, item);
  if (!PItem) return <p>Product not found!</p>;

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
      // alert('Added to wishlist.');
    }
  }

  // useEffect(() => {
  //   setCartCount(Add.length);
  // }, [Add]);

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
    <h2 style={{ textAlign: "center" }}>Your Product</h2><hr />
      <div>
        <div className="wrapper-itm">
          <div className="outer">
            <div className="content animated fadeInLeft">
              <h1>{PItem.name}</h1>
              <p>{PItem.category}</p>
              <p>₹ {PItem.price}</p>
              <Link to="/" style={{ marginLeft: "1rem" }}>
                <Button variant="dark"><i class="fa-solid fa-arrow-left"></i></Button>
              </Link>

              <button style={{ margin: "5px" }} className="btn btn-dark" onClick={() => handlelike(PItem)}>
                <i className={like.includes(PItem) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
              </button>
              <button
                style={{ backgroundColor: Add.includes(PItem) ? "green" : "grey", margin: "5px" }}
                className="btn btn-dark"
                onClick={() => handleAddtocart(PItem)}
              >
                <i className={Add.includes(PItem) ? "fa-solid fa-cart-plus" : "fa-solid fa-cart-shopping"}></i>
              </button>

            </div>
            <img id='itemImg' src={PItem.image} width="300px" className="animated fadeInRight" />
          </div>
        </div>
      </div>
    </>
  )
}

