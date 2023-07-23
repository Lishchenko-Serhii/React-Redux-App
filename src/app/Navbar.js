import React from 'react'

import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example counter & postsList</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Home Page</Link>
            <Link to="/postsList" className="button linkspase">
              to posts list
            </Link>{' '}
            <Link to="/counter" className="button linkspase">
              to counter Component
            </Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
