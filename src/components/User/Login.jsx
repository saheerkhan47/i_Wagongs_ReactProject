import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { mycontext } from "./Mycontext";
import { useEffect } from "react";
import "./Reg.css";


export function Login() {
    const { user, setLogUser, logUser, setLoginStatus, userBan } = useContext(mycontext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const nav = useNavigate();

    function loginBtn(event) {
        event.preventDefault();
        const loggedUser = user.find((userData) => userData.email === email && userData.password === password);

        if (loggedUser) {
            if (loggedUser.banned) {
                setError('User is banned.Please contact support.');
                return;
            }

            setLogUser([...logUser, loggedUser]);
            setLoginStatus(true);
            // alert('Login successful !!!');
            nav('/');
        } else {
            setError('Invalid email or password');
        }
    }


    return (
        <div className='img'>
            <div className="wrapper">
                <form>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="email" placeholder="Email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button onClick={loginBtn} type="button" className="btn">Login</button>
                    {error && <p style={{ color: 'white', paddingLeft: "5rem", paddingTop: "1rem" }}>{error}</p>}
                    <div className="register-link">
                        <p>
                            Don't have an account? <Link to={"/registration"}>Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>

    )
}
