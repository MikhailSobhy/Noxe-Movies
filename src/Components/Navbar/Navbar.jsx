import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ userData, logOut }) {
  const navItems = [
    { name: "Home", to: "/" },
    { name: "Movies", to: "/movies" },
    { name: "TvShow", to: "/tvShow" },
    { name: "People", to: "/people" },
  ];

  const socialLinks = [
    { icon: "fa-facebook", href: "http://facebook.com/mikhails0bhy" },
    {
      icon: "fa-linkedin",
      href: "http://linkedin.com/in/MikhailSobhy",
    },
    { icon: "fa-instagram", href: "http://instagram.com/mikhail_sobhy" },
    { icon: "fa-github", href: "https://github.com/MikhailSobhy" },
  ];

  const activeClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-transparent fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h3 className="noxe">Noxe</h3>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left Menu only if logged in */}
          {userData && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li key={item.name} className="nav-item">
                  <NavLink className={activeClass} to={item.to}>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          {/* Right Menu */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Social Icons */}
            <li className="nav-item d-flex align-items-center">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <i className={`fab mx-2 ${social.icon}`}></i>
                </a>
              ))}
            </li>

            {/* Auth Buttons */}
            {userData ? (
              <li className="nav-item product">
                <button
                  onClick={logOut}
                  className="nav-link bg-transparent border-0 cursor-pointer"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item product">
                  <NavLink className={activeClass} to="/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item product">
                  <NavLink className={activeClass} to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
