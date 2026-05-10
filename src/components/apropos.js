import AvisClient from "./avisClient";
import Footer from "./footer";
import Nav from "./nav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTruck, 
  faGift, 
  faStar, 
  faShieldAlt, 
  faClock, 
  faHeadset,
  faArrowRight,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

export default function Apropos() {
  const features = [
    {
      icon: faTruck,
      title: "Livraison Rapide",
      description: "Notre service de livraison rapide vous garantit la réception rapide de vos produits médicaux, où que vous soyez. Nous nous engageons à vous offrir une expérience fluide et efficace, avec des délais de livraison rapides pour répondre à vos besoins urgents en matière de santé.",
      color: "blue"
    },
    {
      icon: faGift,
      title: "Livraison Gratuite",
      description: "Profitez de notre offre de livraison gratuite pour recevoir vos produits médicaux essentiels sans frais supplémentaires. Simplifiez votre expérience d'achat en ligne tout en économisant sur les frais de livraison.",
      color: "green"
    },
    {
      icon: faShieldAlt,
      title: "Qualité Supérieure",
      description: "Notre engagement envers la qualité supérieure vous assure des produits médicaux sûrs et efficaces, répondant aux normes les plus strictes de l'industrie. Faites confiance à notre sélection soigneusement choisie pour votre santé et votre bien-être optimal.",
      color: "purple"
    }
  ];

  const stats = [
    { number: "10K+", label: "Clients satisfaits", icon: faStar },
    { number: "500+", label: "Produits disponibles", icon: faCheckCircle },
    { number: "24/7", label: "Support client", icon: faHeadset },
    { number: "99%", label: "Taux de satisfaction", icon: faClock }
  ];

  return (
    <>
      <Nav />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-950 to-blue-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm">
                À propos de nous
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Votre Santé, Notre Priorité
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Depuis plus de 10 ans, nous nous engageons à fournir des produits pharmaceutiques 
              de qualité supérieure avec un service exceptionnel.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/produit" className="bg-white text-blue-950 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Découvrir nos produits
              </Link>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-950 px-8 py-3 rounded-full font-semibold transition-all duration-300">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 mb-4">
              Pourquoi Faire Vos Achats Avec Nous ?
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Découvrez les avantages qui font de notre pharmacie votre partenaire santé de confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-8">
                  <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <FontAwesomeIcon 
                      icon={feature.icon} 
                      className={`text-3xl text-${feature.color}-600`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className={`h-1 bg-${feature.color}-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-900 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <FontAwesomeIcon icon={stat.icon} className="text-3xl text-blue-300" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Image Section */}
            <div className="lg:w-1/2 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 to-transparent"></div>
                <img 
                  src="images/saving-img.png" 
                  alt="Offres spéciales" 
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-950 rounded-full px-6 py-3 shadow-lg transform rotate-12 group-hover:rotate-0 transition-all duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold">-30%</div>
                  <div className="text-xs">Sur sélection</div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-700 text-sm font-semibold">Offre Limitée</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 mb-6 leading-tight">
                Offres Exceptionnelles sur
                <span className="block bg-gradient-to-r from-blue-950 to-blue-600 bg-clip-text text-transparent">
                  les Nouveaux Médicaments
                </span>
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Découvrez nos nouvelles gammes de médicaments avec des remises incroyables. 
                Profitez d'un large choix de produits pour tous vos besoins de santé et bien-être.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/produit"
                  className="group inline-flex items-center justify-center bg-blue-950 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-blue-800 hover:scale-105 shadow-lg"
                >
                  <span>Acheter des Produits</span>
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center border-2 border-blue-950 text-blue-950 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-blue-950 hover:text-white"
                >
                  En savoir plus
                </Link>
              </div>

              {/* Features List */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Livraison gratuite", 
                    "Paiement sécurisé", 
                    "Retour gratuit", 
                    "Pharmaciens experts"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-sm" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-950 to-blue-900 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à passer commande ?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits qui nous font confiance pour leur santé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/produit"
              className="bg-white text-blue-950 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Commander maintenant
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-950 px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Demander conseil
            </Link>
          </div>
        </div>
      </section>

      <AvisClient />
      <Footer />
    </>
  );
}