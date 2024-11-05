import React from 'react'
import { mycontext } from '../User/Mycontext';
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './CustView.css'
// import { Navigate } from 'react-router-dom'


export function CustomerView() {

    const { user, setUser } = useContext(mycontext);
    // const nav = useNavigate()

    // function handleApprove(data) {
    //     alert("mail sended")
    // }

    function handleBanned(data) {
        const updatedUsers = user.map((u) =>
            u.email === data.email ? { ...u, banned: !u.banned } : u
        );
        setUser(updatedUsers);
    }
    console.log("banpage", user);



    return (
        <>
            <h3 style={{ textAlign: "center" }}>Customer Details</h3><hr />
            <Link to="/admin" style={{ marginLeft: "1rem" }}>
                <Button variant="dark"><i class="fa-solid fa-arrow-left"></i></Button>
            </Link>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
                {user.length > 0 ? (
                    user.map((data, index) => (
                        <div key={data.id} className="cust-container">
                            <h5>Name: {data.name}</h5>
                            <h6>Email: {data.email}</h6>
                            <h6 style={{ color: data.banned ? "red" : "green" }}>
                                Status: {data.banned ? "Banned" : "Active"}
                            </h6>

                            <Link to="/admin" >
                                <Button style={{ fontSize: "13px" }} variant="light"><i class="fa-solid fa-arrow-left"></i></Button>
                            </Link>

                            <Button
                                style={{ margin: "5px" }}
                                variant={data.banned ? 'success' : 'danger'} // Button color changes based on ban status
                                onClick={() => handleBanned(data)}
                            >
                                {data.banned ? "Unban" : "Ban"}  {/* Toggle button text */}
                            </Button>

                            {/* <Button style={{ margin: "5px" }} variant="success" onClick={() => handleApprove(data)}
                                disabled={data.banned}>
                                Approve
                            </Button> */}
                            {/* <br /><br /> */}
                        </div>
                    ))
                ) : (
                    <p>No Customers found.</p>
                )}
                <div />
            </div>
        </>
    )
}
