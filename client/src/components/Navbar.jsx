import React from "react";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css'

export default function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Link to='/home'>Home</Link>
            <Link to='/'>Register</Link>
            <Link to='/login'>Logout</Link>
        </nav>
    )
}