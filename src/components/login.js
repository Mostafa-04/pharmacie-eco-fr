import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faUserCircle, 
  faSignInAlt,
  faShieldAlt,
  faInfoCircle,
  faEye,
  faEyeSlash,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const admin = { email: 'admin@gmail.com', password: '12345678' };

    const getValue = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
        // Effacer l'erreur quand l'utilisateur commence à taper
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!user.email) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Format d'email invalide";
        }
        
        if (!user.password) {
            newErrors.password = "Le mot de passe est requis";
        } else if (user.password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        
        // Simuler une requête API
        setTimeout(() => {
            if (user.email === admin.email && user.password === admin.password) {
                // Stocker l'état de connexion
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', user.email);
                
                // Redirection vers l'espace admin
                navigate('/ajouter-produit');
            } else {
                setErrors({
                    general: "Email ou mot de passe incorrect"
                });
            }
            setLoading(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"></div>
            </div>
            
            <div className="max-w-md w-full space-y-8 relative z-10">
                {/* Logo/Brand */}
                <div className="text-center">
                    <div className="mx-auto w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-4 transform hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon icon={faUserCircle} className="text-4xl text-blue-950" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white">
                        Espace Administration
                    </h2>
                    <p className="mt-2 text-blue-200 text-sm">
                        Connectez-vous pour gérer votre pharmacie
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
                    <div className="px-8 pt-8 pb-6">
                        {/* Alert message */}
                        {errors.general && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 animate-shake">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{errors.general}</p>
                                    </div>
                                    <button
                                        onClick={() => setErrors({...errors, general: ''})}
                                        className="ml-auto text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-600" />
                                    Adresse Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={getValue}
                                        onKeyPress={handleKeyPress}
                                        disabled={loading}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                            errors.email 
                                                ? 'border-red-500 focus:ring-red-500' 
                                                : 'border-gray-300 focus:border-transparent'
                                        }`}
                                        placeholder="admin@gmail.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-500 flex items-center">
                                        <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FontAwesomeIcon icon={faLock} className="mr-2 text-blue-600" />
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={user.password}
                                        onChange={getValue}
                                        onKeyPress={handleKeyPress}
                                        disabled={loading}
                                        className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                                            errors.password 
                                                ? 'border-red-500 focus:ring-red-500' 
                                                : 'border-gray-300 focus:border-transparent'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <FontAwesomeIcon 
                                            icon={showPassword ? faEyeSlash : faEye} 
                                            className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                                        />
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-500 flex items-center">
                                        <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember me & Forgot password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Se souvenir de moi
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                                        Mot de passe oublié ?
                                    </a>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                        Connexion en cours...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                        Se connecter
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="text-center">
                    <div className="inline-flex items-center space-x-2 text-blue-200 text-xs">
                        <FontAwesomeIcon icon={faShieldAlt} />
                        <span>Connexion sécurisée SSL</span>
                    </div>
                </div>
            </div>
        </div>
    );
}