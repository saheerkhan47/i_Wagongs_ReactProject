import React from 'react'
import { mycontext } from '../User/Mycontext';
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


export function BannedCustomer() {

    const { user } = useContext(mycontext);

    const bannedUsers = user.filter((data) => data.banned);


    return (
        <>
            <h3 style={{ textAlign: "center" }}>Banned Customers</h3><hr />
            <Link to="/admin" style={{ marginLeft: "1rem" }}>
                <Button variant="dark"><i class="fa-solid fa-arrow-left"></i></Button>
            </Link>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
                {bannedUsers.length > 0 ? (
                    bannedUsers.map((data) => (
                        <div key={data.id} className="cust-container">
                            <h5>Name: {data.name}</h5>
                            <h6>Email: {data.email}</h6>
                            <h6 style={{ color: data.banned ? "red" : "green" }}>
                                Status: {data.banned ? "Banned" : "Active"}
                            </h6>
                            {/* <Link to={"/login"} style={{ textDecoration: "none", marginTop: "10px", display: "block" }}>
                                <button style={{ backgroundColor: "orange", color: "white", padding: '5px 10px' }}>
                                    Login
                                </button>
                            </Link> */}
                        </div>
                    ))
                ) : (
                    <p>No banned customers found.</p>
                )}
            </div>
        </>
    )
}
