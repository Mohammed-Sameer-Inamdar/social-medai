import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="Header">
            <h1>Social World</h1>
            <nav className="header-nav">
                <Link className="nav-item" to="/">Home</Link>
                <Link className="nav-item" to="/posts/edit">Add Post</Link>
            </nav>
        </header>
    )

}
export default Header;