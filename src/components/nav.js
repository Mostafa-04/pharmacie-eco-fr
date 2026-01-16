import React from 'react';
import { Link } from 'react-router-dom';
export default function Nav() {
  return (
    <>
      <header className="header_section">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className=""></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <b><span><img src="/images/logopfe.png" style={{width:'45px'}}/></span>Pharmacie</b>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" style={{marginTop:'10px'}}>
                  Accueil <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/produit" style={{marginTop:'10px'}}>
                  Produits
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/apropos" style={{marginTop:'10px'}}>
                  A propos
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact" style={{marginTop:'10px'}}>
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/panier" style={{marginTop:'10px'}}>
                <i class="bi bi-cart"></i>panier
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}