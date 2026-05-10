import Nav from "./nav";
import Footer from "./footer";
import Offre from "./offre";
import AvisClient from "./avisClient";
import { Link } from "react-router-dom";

export default function Contenu() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Welcome To <br />
                <span className="text-blue-200">Pharmacie</span>
              </h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                À la Pharmacie, nous nous engageons à fournir des soins de santé de qualité 
                et des conseils experts à notre communauté. Notre équipe de professionnels 
                qualifiés est dédiée à votre bien-être et à votre santé. Que vous ayez besoin 
                de médicaments sur ordonnance, de produits de santé et de bien-être, ou de 
                conseils personnalisés, nous sommes là pour vous accompagner à chaque étape. 
                Visitez-nous pour tous vos besoins de santé et découvrez notre service exceptionnel.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Link
                  to="/contact"
                  className="bg-white text-blue-950 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Contact Us
                </Link>
                <Link
                  to="/apropos"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-950 px-8 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-20 -z-10"></div>
                <img
                  src="images/img1.png"
                  alt="Pharmacie"
                  className="w-full max-w-md md:max-w-lg animate-float"
                  style={{ filter: "drop-shadow(0 20px 25px -5px rgba(0, 0, 0, 0.2))" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating elements decoration */}
      <div className="relative">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-30 -z-10"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10"></div>
      </div>

      <AvisClient />
      <Offre />
      <Footer />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}