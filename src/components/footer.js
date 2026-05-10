import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock, 
  faShieldAlt, 
  faTruck, 
  faCreditCard,
  faHeart 
} from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Médicaments sur ordonnance", path: "/prescription" },
      { name: "Conseils pharmaceutiques", path: "/conseils" },
      { name: "Livraison à domicile", path: "/livraison" },
      { name: "Téléconsultation", path: "/teleconsultation" }
    ],
    legal: [
      { name: "Mentions légales", path: "/mentions" },
      { name: "Confidentialité", path: "/confidentialite" },
      { name: "CGV", path: "/cgv" },
      { name: "Cookies", path: "/cookies" }
    ]
  };

  return (
    <footer className="bg-blue-950 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logopfe.png" 
                alt="Logo" 
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-2xl font-bold text-white">Pharmacie</h3>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Nous sommes une agence de pharmacie dédiée à fournir des services de santé 
              de qualité supérieure. Notre équipe d'experts pharmaciens s'engage à offrir 
              des conseils personnalisés et des soins adaptés à chaque patient.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <a 
                href="#" 
                className="w-10 h-10 bg-blue-900 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-blue-900 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-blue-900 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-blue-900 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-white" />
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Nos Services
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-400 rounded-full"></div>
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path}
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all duration-300"></span>
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Besoin d'Aide
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-400 rounded-full"></div>
            </h4>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Pour toute question ou conseil concernant votre traitement médicamenteux, 
              notre équipe de pharmaciens est à votre disposition pour vous aider et vous guider.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-blue-200">
                <FontAwesomeIcon icon={faClock} className="text-blue-400 text-sm" />
                <span className="text-sm">Lun-Ven: 9h - 19h</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <FontAwesomeIcon icon={faClock} className="text-blue-400 text-sm" />
                <span className="text-sm">Sam: 9h - 14h</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Contactez-nous
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-400 rounded-full"></div>
            </h4>
            <div className="space-y-3">
              <a 
                href="https://maps.google.com/?q=Casablanca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start space-x-3 text-blue-200 hover:text-white transition-colors duration-300 group"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-400 mt-1 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Casablanca, Maroc</span>
              </a>
              <a 
                href="tel:+212617125803" 
                className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors duration-300 group"
              >
                <FontAwesomeIcon icon={faPhone} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+212 617 125 345</span>
              </a>
              <a 
                href="mailto:Pharmacie@gmail.com" 
                className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors duration-300 group"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Pharmacie@gmail.com</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">Newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="flex-1 px-3 py-2 rounded-l-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-r-lg transition-colors duration-300">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Security Badges */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faShieldAlt} className="text-green-400" />
                <span className="text-blue-200 text-sm">Paiement sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faTruck} className="text-blue-400" />
                <span className="text-blue-200 text-sm">Livraison gratuite</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCreditCard} className="text-yellow-400" />
                <span className="text-blue-200 text-sm">Paiement à la livraison</span>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="flex space-x-3">
              <img src="/images/visa.png" alt="Visa" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/images/mastercard.png" alt="Mastercard" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/images/paypal.png" alt="PayPal" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-blue-950/50 border-t border-blue-800">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-blue-300 text-sm text-center">
              &copy; {currentYear} Pharmacie. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-1 text-blue-300 text-sm">
              <span>Fait avec</span>
              <FontAwesomeIcon icon={faHeart} className="text-red-400 animate-pulse" />
              <span>pour votre santé</span>
            </div>
            <div className="flex space-x-4 text-sm">
              <Link to="/mentions" className="text-blue-300 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-blue-300 hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link to="/cgv" className="text-blue-300 hover:text-white transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 group"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}