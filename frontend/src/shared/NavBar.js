import React from 'react'
import { Link } from 'react-router-dom'

// Relies on Bootstrap's navbar CSS
// @see https://getbootstrap.com/docs/4.0/components/navbar/

const NavBar = () => {
  return (
  <nav className="navbar navbar-dark bg-dark">
    <Link to='/' className="navbar-brand">Readable</Link>
  </nav>
  )
}

export default NavBar
