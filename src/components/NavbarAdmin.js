import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCapsules, 
  faFolderPlus, 
  faComments, 
  faCartShopping, 
  faSignOutAlt, 
  faUserCircle,
  faBars,
  faTimes,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';

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

    const navItems = [
        { path: "/ajouter-produit", icon: faCapsules, label: "Produits", description: "Gérer les produits" },
        { path: "/ajouter-categorie", icon: faFolderPlus, label: "Catégories", description: "Gérer les catégories" },
        { path: "/contacts", icon: faComments, label: "Contacts", description: "Messages clients" },
        { path: "/commands", icon: faCartShopping, label: "Commandes", description: "Suivi des commandes" }
    ];

    return (
        <>
            <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo et nom */}
                        <Link 
                            to="/ajouter-produit" 
                            onClick={closeMenu}
                            className="flex items-center space-x-3 group"
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                                    <img 
                                        src="/images/logopfe.png" 
                                        alt="Logo Pharmacie" 
                                        className="w-8 h-8 object-contain"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-blue-400 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            </div>
                            <div className="hidden md:block">
                                <h1 className="text-xl font-bold text-blue-950 leading-tight">Pharmacie</h1>
                                <p className="text-xs text-gray-500">Tableau de bord</p>
                            </div>
                            <div className="md:hidden">
                                <h1 className="text-lg font-bold text-blue-950">Pharmacie</h1>
                            </div>
                        </Link>

                        {/* Bouton hamburger mobile */}
                        <button 
                            onClick={toggleMenu}
                            className="md:hidden w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                            aria-label="Toggle menu"
                        >
                            <FontAwesomeIcon 
                                icon={isMenuOpen ? faTimes : faBars} 
                                className="text-gray-600 text-xl"
                            />
                        </button>

                        {/* Menu desktop */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                                        isActive(item.path)
                                            ? 'bg-blue-950 text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-blue-950'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                        isActive(item.path) ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-blue-100'
                                    }`}>
                                        <FontAwesomeIcon 
                                            icon={item.icon} 
                                            className={`text-sm ${
                                                isActive(item.path) ? 'text-white' : 'text-blue-600'
                                            }`}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-sm font-medium block">{item.label}</span>
                                        <span className="text-xs opacity-75">{item.description}</span>
                                    </div>
                                </Link>
                            ))}

                            {/* Séparateur */}
                            <div className="h-10 w-px bg-gray-200 mx-2"></div>

                            {/* Profil utilisateur */}
                            <div className="flex items-center space-x-3 ml-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                                        <FontAwesomeIcon icon={faUserCircle} className="text-white text-xl" />
                                    </div>
                                    <div className="hidden lg:block">
                                        <p className="text-sm font-semibold text-gray-800">Administrateur</p>
                                        <p className="text-xs text-gray-500">Super Admin</p>
                                    </div>
                                </div>

                                {/* Bouton Déconnexion */}
                                <button
                                    onClick={handleLogout}
                                    className="ml-2 flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-300 hover:scale-105"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span className="hidden lg:inline text-sm font-medium">Déconnexion</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Menu mobile */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300 md:hidden ${
                isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`} onClick={closeMenu}>
                <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`} onClick={(e) => e.stopPropagation()}>
                    {/* En-tête mobile */}
                    <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <img 
                                    src="/images/logopfe.png" 
                                    alt="Logo" 
                                    className="w-8 h-8 object-contain"
                                />
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-lg">Pharmacie</h2>
                                <p className="text-blue-200 text-xs">Tableau de bord administrateur</p>
                            </div>
                        </div>
                        <button
                            onClick={closeMenu}
                            className="absolute top-4 right-4 text-white hover:text-gray-200"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-xl" />
                        </button>
                    </div>

                    {/* Navigation mobile */}
                    <div className="p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeMenu}
                                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                                    isActive(item.path)
                                        ? 'bg-blue-950 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    isActive(item.path) ? 'bg-white/20' : 'bg-gray-100'
                                }`}>
                                    <FontAwesomeIcon 
                                        icon={item.icon} 
                                        className={`text-lg ${
                                            isActive(item.path) ? 'text-white' : 'text-blue-600'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium">{item.label}</p>
                                    <p className={`text-xs ${
                                        isActive(item.path) ? 'text-blue-200' : 'text-gray-500'
                                    }`}>
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                        ))}

                        <div className="border-t border-gray-200 my-4"></div>

                        {/* Profil mobile */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={faUserCircle} className="text-white text-lg" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">Administrateur</p>
                                    <p className="text-xs text-gray-500">Super Admin</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span className="text-sm">Déconnexion</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}