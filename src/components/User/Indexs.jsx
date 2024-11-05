import React, { useEffect } from 'react'
import { mycontext } from './Mycontext';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from './Header';
// import './Indexs.css'


export function Indexs() {

  const { product, like, setLike, Add, setAdd, loginStatus, setLoginStatus, newLanuch } = useContext(mycontext);
  const [searchQuery, setSearchQuery] = useState("")
  const [searchData, setSearchData] = useState(product)
  const [cartCount, setCartCount] = useState(0);


  const nav = useNavigate()


  function handlelike(products) {
    if (!loginStatus) {    // "!" add condition work correclty
      alert('Please login to add items to the wishlist.');
      nav('/login')
      return;
    }
    if (like.includes(products)) {
      // alert('Product is already in the wishlist.');
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
      // alert('Product is already in the cart.');
      setAdd(Add.filter(item => item !== products));
      setCartCount(cartCount - 1);
    }
    else {
      setAdd([...Add, products])
      setCartCount(cartCount + 1)
    }
  }

  function handleSearch(e) {
    const query = e.target.value
    setSearchQuery(query)

    const filtered = product.filter(item => {
      const { name, category, price } = item
      return (
        name.toLowerCase().includes(query.toLowerCase()) ||
        category.toLowerCase().includes(query.toLowerCase()) ||
        price.toString().includes(query)
      )
    })
    setSearchData(filtered)
  }
  console.log("filtered", searchData);


  const categories = [...new Set(product.map(item => item.category))]

  console.log("cat", categories);

  function handleChange(e) {
    const query = e.target.value
    nav(`C/${query}`)
  }


  function handleViewItem(item) {
    nav(`P/${item.id}`)
  }

  useEffect(() => {
    console.log("Login Status: ", loginStatus);
  }, [loginStatus]);


  function handleLogout() {
    setLoginStatus(false);
    setAdd([]);
    setLike([]);
    nav('/login');
  }

  return (
    <>
      <Header
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleChange={handleChange}
        categories={categories}
        cartCount={cartCount}
      />

      { /* New Lauch banner */}
      <div className="cards-box">
        <h5>New Launch</h5>
        <div className='cards'>
          {
            product.map((menu) =>
              <div>
                <img src={menu.image} alt='cards-img' />
              </div>
            )
          }
        </div>
      </div><br />

      <h4 style={{ textAlign: "center" }}><i class="fa-brands fa-apple" style={{ fontSize: "33px" }} ></i> Products Shop Now</h4><hr />
      <div className="pro-card">
        {searchData.length > 0 ? (
          searchData.map((menu) => (
            <div key={menu.id} className="card product-card" style={{ width: "18rem" }}>
              <Link to={`/P/${menu.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={menu.image} className="card-img-top" height={250} alt="Product" />
                <div className="card-body">
                  <h5 className="card-title">{menu.name}</h5>
                  <p className="card-text">{menu.category}</p>
                  <p className="card-text">₹ {menu.price}</p>
                </div>
              </Link>
              <button style={{ margin: "5px" }} className="btn btn-dark" onClick={() => handlelike(menu)}>
                <i className={like.includes(menu) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
              </button>
              <button
                style={{ backgroundColor: Add.includes(menu) ? "green" : "grey", margin: "5px" }}
                className="btn btn-dark"
                onClick={() => handleAddtocart(menu)}
              >
                <i className={Add.includes(menu) ? "fa-solid fa-cart-plus" : "fa-solid fa-cart-shopping"}></i>
              </button>
            </div>
          ))
        ) : (
          <p className="empty-cart-message">No products found matching your search!</p>
        )}
      </div>
    </>
  )
}
