import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./NavbarAdmin.css";

export default function NavbarAdmin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-admin shadow-sm">
                <div className="container">
                    {/* Logo et nom de la pharmacie */}
                    <Link className="navbar-brand d-flex align-items-center" to="/ajouter-produit" onClick={closeMenu}>
                        <div className="logo-container me-3">
                            <img 
                                src="/images/logopfe.png" 
                                alt="Logo Pharmacie" 
                                className="pharmacy-logo"
                            />
                        </div>
                        <div className="d-none d-md-block">
                            <h1 className="pharmacy-name mb-0">Pharmacie</h1>
                            <p className="pharmacy-subtitle mb-0">Tableau de bord</p>
                        </div>
                        <div className="d-md-none">
                            <h1 className="pharmacy-name-mobile mb-0">Pharmacie</h1>
                        </div>
                    </Link>

                    {/* Bouton hamburger pour mobile */}
                    <button 
                        className="navbar-toggler border-0" 
                        type="button" 
                        onClick={toggleMenu}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon-custom">
                            <i className="bi bi-list"></i>
                        </span>
                    </button>

                    {/* Menu de navigation */}
                    <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                            {/* Lien Ajouter Produit */}
                            <li className="nav-item mx-1">
                                <Link 
                                    className={`nav-link d-flex align-items-center ${isActive('/ajouter-produit') ? 'active' : ''}`} 
                                    to="/ajouter-produit"
                                    onClick={closeMenu}
                                >
                                    <div className="nav-icon-container">
                                        <i className="bi bi-capsule">    </i>
                                    </div>
                                    <div className="nav-text-container ms-2">
                                        <span className="nav-link-text">Produits</span>
                                        
                                    </div>
                                </Link>
                            </li>

                            {/* Lien Ajouter Catégorie */}
                            <li className="nav-item mx-1">
                                <Link 
                                    className={`nav-link d-flex align-items-center ${isActive('/ajouter-categorie') ? 'active' : ''}`} 
                                    to="/ajouter-categorie"
                                    onClick={closeMenu}
                                >
                                    <div className="nav-icon-container">
                                        <i className="bi bi-folder-plus">    </i>
                                    </div>
                                    <div className="nav-text-container ms-2">
                                        <span className="nav-link-text">Catégories</span>
                                        
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item mx-1">
    <Link 
        className={`nav-link d-flex align-items-center ${isActive('/contacts') ? 'active' : ''}`} 
        to="/contacts"
        onClick={closeMenu}
    >
        <div className="nav-icon-container">
            <i className="bi bi-chat-left-text"> </i>
        </div>
        <div className="nav-text-container ms-2">
            <span className="nav-link-text">Contacts</span>
           
        </div>
    </Link>
</li>

<li className="nav-item mx-1">
    <Link 
        className={`nav-link d-flex align-items-center ${isActive('/commandes') ? 'active' : ''}`} 
        to="/commandes"
        onClick={closeMenu}
    >
        <div className="nav-icon-container">
            <i className="bi bi-cart-check"> </i>
        </div>
        <div className="nav-text-container ms-2">
            <span className="nav-link-text">Commandes</span>
        </div>
    </Link>
</li>

                            {/* Séparateur vertical */}
                            <li className="nav-item mx-2 d-none d-lg-block">
                                <div className="nav-divider-vertical"></div>
                            </li>

                            {/* Profil utilisateur */}
                            <li className="nav-item mx-2">
                                <div className="d-flex align-items-center">
                                    <div className="user-avatar me-2">
                                        <i className="bi bi-person-circle text-primary">        </i>
                                    </div>
                                    <div className="user-info d-none d-md-block">
                                        <span className="user-name">Administrateur</span>
                                        <span className="user-role d-block">Super Admin</span>
                                    </div>
                                </div>
                            </li>

                            {/* Bouton Déconnexion */}
                            <li className="nav-item ms-2">
                                <button 
                                    className="btn btn-logout btn-outline-primary d-flex align-items-center"
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-power me-2">        </i>
                                    <span className="logout-text d-none d-md-inline">Déconnexion</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Overlay pour fermer le menu sur mobile */}
            {isMenuOpen && (
                <div 
                    className="menu-overlay" 
                    onClick={closeMenu}
                ></div>
            )}
        </>
    );
}