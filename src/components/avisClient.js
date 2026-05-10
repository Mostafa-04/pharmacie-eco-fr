import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';

export default function AvisClient() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const avis = [
    {
      id: 1,
      name: "HAMZA Mechal",
      title: "Service impeccable !",
      rating: 5,
      content: "La navigation sur le site est simple et efficace. J'ai pu trouver facilement les médicaments dont j'avais besoin. La livraison rapide m'a permis de recevoir mes produits le lendemain de ma commande. Merci pour votre professionnalisme !",
      date: "15 Mars 2025"
    },
    {
      id: 2,
      name: "mohamed farah",
      title: "Excellente expérience !",
      rating: 5,
      content: "C'est la première fois que je commande sur ce site et je suis très impressionnée. Les prix sont compétitifs et le choix de produits est vaste. De plus, j'ai apprécié les conseils personnalisés du pharmacien. Je repasserai commande sans hésiter.",
      date: "10 Mars 2025"
    },
    {
      id: 3,
      name: "fadoua zouine",
      title: "Très satisfaite !",
      rating: 5,
      content: "J'ai commandé plusieurs produits sur ce site et la livraison a été très rapide. Les produits sont de qualité et conformes à la description. Le service client est également très réactif et à l'écoute. Je recommande vivement cette pharmacie en ligne !",
      date: "5 Mars 2025"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % avis.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + avis.length) % avis.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 mb-4 relative">
              Avis Clients
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-500 rounded-full"></div>
            </h2>
          </div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Découvrez ce que nos clients pensent de notre service
          </p>
        </div>

        {/* Testimonials Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {avis.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 relative">
                <div className="absolute top-4 right-4">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-white/20 text-4xl" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-bold text-lg">{item.name}</h5>
                    <p className="text-blue-200 text-sm">{item.date}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h6 className="text-blue-950 font-semibold text-md">{item.title}</h6>
                  <div className="flex items-center space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  "{item.content}"
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-medium">Client satisfait</span>
                    <div className="flex items-center space-x-1 text-green-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Vérifié</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel - Mobile/Tablet */}
        <div className="md:hidden">
          <div className="relative">
            {/* Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 relative">
                <div className="absolute top-4 right-4">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-white/20 text-4xl" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {avis[currentIndex].name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-bold text-lg">{avis[currentIndex].name}</h5>
                    <p className="text-blue-200 text-sm">{avis[currentIndex].date}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h6 className="text-blue-950 font-semibold text-md">{avis[currentIndex].title}</h6>
                  <div className="flex items-center space-x-1">
                    {[...Array(avis[currentIndex].rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  "{avis[currentIndex].content}"
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-medium">Client satisfait</span>
                    <div className="flex items-center space-x-1 text-green-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Vérifié</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-blue-950 text-blue-950 hover:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 z-10"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-blue-950 text-blue-950 hover:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 z-10"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {avis.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? 'w-8 h-2 bg-blue-600'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-950">4.9</div>
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-gray-500 text-sm">Note moyenne</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-950">500+</div>
              <p className="text-gray-500 text-sm">Clients satisfaits</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-950">98%</div>
              <p className="text-gray-500 text-sm">Recommandent notre service</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-950">24/7</div>
              <p className="text-gray-500 text-sm">Support client</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}