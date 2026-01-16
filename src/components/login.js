import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

export default function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [admin, setAdmin] = useState({ email: 'admin@gmail.com', password: '12345678' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e?.preventDefault(); // Empêche le rechargement de la page si appelé depuis onSubmit
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        
        // Simuler une requête API
        setTimeout(() => {
            if (user.email === admin.email && user.password === admin.password) {
                // Stocker l'état de connexion (optionnel)
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/ajouter-produit');
            } else {
                alert('Identifiants invalides');
                setErrors({
                    general: "Email ou mot de passe incorrect"
                });
            }
            setLoading(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="login-container d-flex align-items-center min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card login-card shadow-lg border-0">
                            <div className="card-header bg-primary text-white text-center py-4">
                                <h2 className="mb-0">
                                    <i className="bi bi-person-circle me-2"></i>
                                      Connexion Admin
                                </h2>
                                <p className="mt-2 mb-0 opacity-75">Accédez à votre espace d'administration</p>
                            </div>
                            
                            <div className="card-body p-4 p-md-5">
                                {errors.general && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {errors.general}
                                        <button 
                                            type="button" 
                                            className="btn-close" 
                                            onClick={() => setErrors({...errors, general: ''})}
                                        ></button>
                                    </div>
                                )}
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label fw-semibold">
                                            <i className="bi bi-envelope me-2"> </i>
                                            Adresse Email
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-person"> </i>
                                            </span>
                                            <input
                                                type="email"
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                id="email"
                                                name="email"
                                                placeholder="admin@gmail.com"
                                                value={user.email}
                                                onChange={getValue}
                                                onKeyPress={handleKeyPress}
                                                disabled={loading}
                                            />
                                        </div>
                                        {errors.email && (
                                            <div className="invalid-feedback d-block">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label fw-semibold">
                                            <i className="bi bi-lock me-2"></i>
                                            Mot de passe
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-key"></i>
                                            </span>
                                            <input
                                                type="password"
                                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                id="password"
                                                name="password"
                                                placeholder="••••••••"
                                                value={user.password}
                                                onChange={getValue}
                                                onKeyPress={handleKeyPress}
                                                disabled={loading}
                                            />
                                        </div>
                                        {errors.password && (
                                            <div className="invalid-feedback d-block">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="text text-center d-grid mb-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Connexion en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-box-arrow-in-right me-2"> </i>

                                                        Se connecter
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    
                                    <div className="text-center mt-4">
                                        <p className="text-muted mb-2">
                                            <small>
                                                <i className="bi bi-info-circle me-1"></i>
                                                Pour tester l'application, utilisez les identifiants suivants:
                                            </small>
                                        </p>
                                    </div>
                                </form>
                            </div>
                            
                            <div className="card-footer text-center py-3 bg-light">
                                <small className="text-muted">
                                    <i className="bi bi-shield-check me-1"></i>
                                    Votre sécurité est notre priorité
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}