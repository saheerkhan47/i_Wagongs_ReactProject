import React from 'react'
import { mycontext } from '../User/Mycontext';
import { useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './admin.css'


export function Admin() {
  const { setLoginStatus} = useContext(mycontext);
  const nav=useNavigate();

  function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
    setLoginStatus(false);
    nav('/admin/adminlogin');
  }
}

  return (
    <>
      <div className="a-index">
        <div className='a-logo' id='alogo'><h2>i Wag<i class="fa-brands fa-apple"></i>ns</h2></div>
        <div className="a-links">
        <Link to={"/admin/adminlogin"} onClick={handleLogout}>
              <h5>
                <i class="fa-solid fa-right-from-bracket"></i>
              </h5>
            </Link>
        {/* <h3 style={{ alignContent: "center", paddingTop: "18rem" }}>Welcome to i Wag<i class="fa-brands fa-apple"></i>ns </h3> */}
      </div>
      </div>

      <div className='side-bar'>
        <div style={{ textAlign: "center", color: "azure" }} className='a-logo' id='alogo'><h2>i Wag<i class="fa-brands fa-apple"></i>ns</h2></div>
        <div className="side-links">
          <Link to={"/admin/productview"}><h6>i Products</h6></Link><hr />
          <Link to={"/admin/customerview"}><h6>CustomerView </h6></Link><hr />
          <Link to={"/admin/bannedcustomer"}><h6>BannedCustomer </h6></Link><hr />
          <Link to={"/"}><h6>Home</h6></Link><hr />
          <Link to={"/admin/adminlogin"}><h6>Logout</h6></Link><hr />
        </div>
      </div>
      <main className="admin-dashboard">
        <h3>Welcome to i Wag<i class="fa-brands fa-apple"></i>ns Dashboard</h3>
      </main>
    </>
  )
}
