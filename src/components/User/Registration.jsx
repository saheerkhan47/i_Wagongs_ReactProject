import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import { mycontext } from './Mycontext';
import "./Reg.css";




export function Registration() {
  const { user, setUser } = useContext(mycontext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const nav = useNavigate();

  const UserAlreadyReg = () => {
    return user.find((data) => data.email === email);
  };

  const validateEmail = (email) => {
    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegx.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleButtonClick = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    if (UserAlreadyReg()) {
      alert("User already registered. Please use a different email.");
      return;
    }

    const userData = { name, email, password };
    setUser([...user, userData]);

    nav("/login");
    console.log("Registered user:", userData);
  };

  return (
    <div className='img'>
      <div className="wrapper">
        <form>
          <h1>Register</h1>

          <div className="input-box">
            <input type="text" placeholder="Name" value={name} 
            onChange={(e) => setName(e.target.value)} required/> 
          </div>

          <div className="input-box">
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }} />
            {emailError && <p style={{ color: "white", paddingLeft:"3rem"}}>{emailError}</p>}
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }} />
            {passwordError && <p style={{ color: "white",paddingLeft:"2rem"}}>{passwordError}</p>}
          </div>

          {/* <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forgot Password</a>
          </div> */}
          <button onClick={() => handleButtonClick()} type="button" className="btn">Register</button>
          <div className="register-link">
                        <p>
                            I have an account <Link to={"/login"}>Login</Link>
                        </p>
                    </div>
        </form>
      </div>
    </div>
  );
}
