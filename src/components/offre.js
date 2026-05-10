import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faArrowRight, faTag, faStar, faClock, faTruck, faSmile } from '@fortawesome/free-solid-svg-icons';

export default function Offre() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="lg:w-5/12 animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 to-transparent"></div>
                <img 
                  src="images/gifts.png" 
                  alt="Cadeaux Bonus" 
                  className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-5 -right-5 bg-white rounded-xl shadow-xl p-3 animate-bounce">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faTruck} className="text-blue-600" />
                  <span className="text-blue-950 font-bold text-sm">Livraison Offerte</span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl p-3 animate-pulse">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faSmile} className="text-green-500" />
                  <span className="text-blue-950 font-bold text-sm">100% Satisfait</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-7/12 text-center lg:text-left animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-blue-950 text-sm font-semibold">OFFRE SPÉCIALE</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-950 mb-6 leading-tight">
              Des Cadeaux Bonus
              <span className="block bg-gradient-to-r from-blue-950 to-blue-600 bg-clip-text text-transparent">
                avec Vos Produits
              </span>
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Pour chaque achat de certains produits sélectionnés, recevez des 
              <span className="text-blue-600 font-bold mx-1">cadeaux bonus exclusifs</span> ! 
              Profitez de cette opportunité pour choyer vos proches ou vous faire plaisir.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { text: "Livraison Rapide", icon: faTruck, color: "blue" },
                { text: "Paiement Sécurisé", icon: faStar, color: "green" },
                { text: "Satisfait ou Remboursé", icon: faSmile, color: "purple" },
                { text: "Support 24/7", icon: faClock, color: "orange" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-gray-50 rounded-xl p-3 hover:shadow-md transition-all duration-300">
                  <div className={`w-10 h-10 bg-${feature.color}-100 rounded-full flex items-center justify-center`}>
                    <FontAwesomeIcon icon={feature.icon} className={`text-${feature.color}-600`} />
                  </div>
                  <span className="text-blue-950 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/produit"
                className="group relative inline-flex items-center justify-center bg-blue-950 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-blue-800 hover:scale-105 shadow-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Profiter de l'offre</span>
                  <FontAwesomeIcon icon={faArrowRight} className="transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border-2 border-blue-950 text-blue-950 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-blue-950 hover:text-white hover:scale-105"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}