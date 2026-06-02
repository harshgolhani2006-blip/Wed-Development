import React from 'react'
import { Link } from 'react-router-dom'
import "./App.css"

const NavBar = () => {
  return (
<div id= "nav">
        <li>
            <Link to={"/"}>
        Home
        </Link>
        </li>
        <li>
            <Link to={"/Form"}>Form
            </Link>
            </li>
        <li>
            <Link to={"/Product"}>Product
            </Link>
            </li>
    </div>
  )
}

export default NavBar