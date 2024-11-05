import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './adminLogin.css'

export function AdminLogin() {
    const [Username,setUsername]=useState("");
    const [Password,setPassword]=useState("");
    const [error, setError] = useState('');
    const nav=useNavigate();

    function handleAdminLogin(){
        if(Username === "admin" && Password === "admin"){
            nav('/admin');
        }
        else{
            setError('Invalid email or password');

        }
    }

  return (
    <div className='admin-img'>
            <div className="wrapper">
                <form>
                    <h1>Admin</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Name" value={Username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Password" value={Password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button onClick={handleAdminLogin} type="button" className="btn">Login</button>
                    {error && <p style={{ color: 'white', paddingLeft:"5rem", paddingTop:"1rem"}}>{error}</p>}
                </form>
            </div>
        </div>
  )
}
