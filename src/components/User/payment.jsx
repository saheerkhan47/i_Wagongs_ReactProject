import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export function Payment() {
    const amount = useLocation().state;
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);



    useEffect(() => {
        // Hide the message or navigate away after 10 seconds
        const timer = setTimeout(() => {
            setVisible(false); // To hide the message
            // Optionally navigate to another page after hiding the message
            navigate('/'); // Redirect to home page or any other route
        }, 10000); // 10 seconds in milliseconds

        // Cleanup timer if the component is unmounted
        return () => clearTimeout(timer);
    }, [navigate]);

    if (!visible) {
        return null;
    }

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Payment</h2><hr />
            <Link to="/" style={{ marginLeft: "1rem" }}>
                <Button variant="dark"><i className="fa-solid fa-arrow-left"></i></Button>
            </Link>

            <div style={{ width: '100vw', height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'green', width: '80%', height: '300px', border: '1px dotted red', borderRadius: '30px' }}>
                    <h2>
                        Payment of ₹{amount}/- is successful!
                    </h2>
                </div>
            </div>
        </>
    );

}
