import React from 'react'

import {BrowserRouter as Router ,Link} from 'react-router-dom'

const Navbar = () => {
    return (

        

        <nav className="navbar bg-dark">

            

            <Router>

                

                <h1>
                    <Link  to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
                <ul>
                    <li><Link  to="!#">Developers</Link></li>
                    <li><Link  to="/register">Register</Link></li>
                    <li><Link  to="/login">Login</Link></li>
                </ul>
                

            </Router>

            
        </nav>
    )
}
export default Navbar;
