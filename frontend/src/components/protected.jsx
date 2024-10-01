import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        let login = localStorage.getItem('token');
        let role = localStorage.getItem('role');
        const currentPath = window.location.pathname;

        if (!login) {
            // If the user is not logged in, redirect to the landing page
            navigate("/");
        } else {
            // Restrict access based on role and current path
            if (role === 'user') {
                // If role is 'user', block access to admin and maintenance pages
                if (currentPath.startsWith('/admin-home-page') || currentPath.startsWith('/maintainance')) {
                    navigate("/user-home-page");
                }
            } else if (role === 'admin') {
                // If role is 'admin', restrict access to user-only routes (if applicable)
                if (currentPath.startsWith('/user-home-page')) {
                    navigate("/admin-home-page");
                }
            }
        }
    }, [navigate]);

    return (
        <div>
            <Component />
        </div>
    );
}

export default Protected;
