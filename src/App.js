import { BrowserRouter, Routes, Route } from "react-router-dom";
import { mycontext } from "./components/User/Mycontext";
import { useState } from "react";

// User pages lists
import { Indexs } from "./components/User/Indexs";
import { iproducts } from "./components/User/iProducts";
import { Newiproducts } from "./components/User/iProducts";
import { Wishlists } from "./components/User/Wishlists";
import { Addtocart } from "./components/User/Addtocart";
import { Registration } from "./components/User/Registration";
import { Login } from "./components/User/Login";
import { CategoryList } from "./components/User/CategoryList";
import { ItemView } from "./components/User/ItemView";
// import { Header } from "./components/User/Header";
import { Footer } from "./components/User/footer";


// Admin pages lists
import { Admin } from "./components/Admin/Admin";
import { CustomerView } from "./components/Admin/CustomerView";
import { BannedCustomer } from "./components/Admin/BannedCustomer";
import { ProductView } from "./components/Admin/ProductView";
import { AdminLogin } from "./components/Admin/AdminLogin";
import { AddProducts } from "./components/Admin/AddProducts";
import { Payment } from "./components/User/payment";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['']); // Example categories
  const nav=useState();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  function handleChange(e) {
    const query = e.target.value;
  }

  const [product, setProduct] = useState(iproducts);
  const [newLanuch, setNewlanuch] = useState(Newiproducts);
  const [like, setLike] = useState([]);
  const [Add, setAdd] = useState([]);
  const [user, setUser] = useState([]);
  const [logUser, setLogUser] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [ProData, setProData] = useState(iproducts);
  const [userBan, setUserBan] = useState([]);

  const values = {
    product, setProduct,
    like, setLike,
    Add, setAdd,
    user, setUser,
    logUser, setLogUser,
    loginStatus, setLoginStatus,
    ProData, setProData,
    userBan, setUserBan,
    newLanuch, setNewlanuch,
  };

  return (
    <mycontext.Provider value={values}>
      <BrowserRouter>
      <div className="app-container"> 
          <main> 
        <Routes>
          {/* User pages */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Indexs />} />
          <Route path='/wishlist' element={<Wishlists/>}></Route>
          <Route path="/addtocart" element={
            <Addtocart
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              handleChange={handleChange}
              categories={categories}
            />
          } />

          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="C/:category" element={<CategoryList />} />
          <Route path='P/:item' element={<ItemView />} />
          <Route path="/payment" element={<Payment/>} />

          {/* Admin pages */}
          <Route path="/admin/customerview" element={<CustomerView />} />
          <Route path="/admin/bannedcustomer" element={<BannedCustomer />} />
          <Route path="/admin/productview" element={<ProductView />} />
          <Route path="/admin/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/addproducts" element={<AddProducts />} />
        </Routes>
        </main>
          <Footer />
        </div>
      </BrowserRouter>
    </mycontext.Provider>
  );
}
