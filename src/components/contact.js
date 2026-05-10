import axios from "axios";
import Nav from "./nav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./footer";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock,
  faUser,
  faPaperPlane,
  faCheckCircle,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
  const [NewContact, setNewContact] = useState({
    nomContact: "",
    numTel: "",
    email: "",
    choix: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Navigate = useNavigate();

  const getValue = (event) => {
    setNewContact((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const AjouterC = async () => {
    // Validation
    if (!NewContact.nomContact || !NewContact.email || !NewContact.message) {
      Swal.fire({
        icon: "error",
        title: "Champs manquants",
        text: "Veuillez remplir tous les champs obligatoires",
        confirmButtonColor: "#172554",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/contact", NewContact);
      
      if (response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Message envoyé avec succès !",
          text: "Nous vous répondrons dans les plus brefs délais.",
          showConfirmButton: true,
          confirmButtonColor: "#172554",
          confirmButtonText: "OK",
          timer: 3000
        });
        
        setNewContact({
          nomContact: "",
          numTel: "",
          email: "",
          choix: "",
          message: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        confirmButtonColor: "#172554",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: faMapMarkerAlt, title: "Notre adresse", content: "Casablanca, Maroc", color: "red" },
    { icon: faPhone, title: "Téléphone", content: "+212 617 125 803", link: "tel:+212617125803" },
    { icon: faEnvelope, title: "Email", content: "Pharmacie@gmail.com", link: "mailto:Pharmacie@gmail.com" },
    { icon: faClock, title: "Horaires d'ouverture", content: "Lun-Ven: 9h-19h, Sam: 9h-14h", color: "green" },
  ];

  return (
    <>
      <Nav />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-950 to-blue-900 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm">
                Contactez-nous
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Nous Sommes à Votre Écoute
            </h1>
            <p className="text-blue-100 text-lg">
              Une question ? Un besoin de conseil ? Notre équipe de pharmaciens experts 
              est là pour vous répondre.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className={`w-14 h-14 bg-${info.color || 'blue'}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <FontAwesomeIcon icon={info.icon} className={`text-2xl text-${info.color || 'blue'}-600`} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
              {info.link ? (
                <a href={info.link} className="text-gray-600 hover:text-blue-600 transition-colors">
                  {info.content}
                </a>
              ) : (
                <p className="text-gray-600">{info.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Contact Form Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Map */}
              <div className="relative h-96 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 to-blue-900/80 z-10"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212753.67439902035!2d-7.7518051687337834!3d33.57217828345677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sfr!2sma!4v1716725349038!5m2!1sfr!2sma"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  title="Carte Casablanca"
                ></iframe>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-xs mx-4 text-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-3xl text-blue-600 mb-2" />
                    <p className="text-gray-800 font-semibold">Pharmacie</p>
                    <p className="text-gray-600 text-sm">Casablanca, Maroc</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-2">
                    Envoyez-nous un message
                  </h2>
                  <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-600 mt-4">
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); AjouterC(); }}>
                  {/* Name Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="nomContact"
                        placeholder="Votre nom"
                        onChange={getValue}
                        value={NewContact.nomContact}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="votre@email.com"
                        onChange={getValue}
                        value={NewContact.email}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Téléphone
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="numTel"
                        placeholder="+212 6XX XXX XXX"
                        onChange={getValue}
                        value={NewContact.numTel}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Sujet
                    </label>
                    <div className="relative">
                      <select
                        name="choix"
                        onChange={getValue}
                        value={NewContact.choix}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                      >
                        <option value="">Choisissez un sujet...</option>
                        <option value="sirop">Sirop</option>
                        <option value="pommades">Pommades</option>
                        <option value="comprimé">Comprimé</option>
                        <option value="huile">Huile</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      placeholder="Votre message..."
                      rows="4"
                      onChange={getValue}
                      value={NewContact.message}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={AjouterC}
                    disabled={isSubmitting}
                    className="w-full bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>

                  {/* Trust Badge */}
                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <FontAwesomeIcon icon={faHeadset} />
                      <span>Support disponible 24/7</span>
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                      <span>Réponse sous 24h</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">
              Questions Fréquentes
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "Comment passer commande ?",
                a: "Rendez-vous sur notre page produits, ajoutez les articles au panier et suivez les instructions de paiement."
              },
              {
                q: "Quels sont les délais de livraison ?",
                a: "La livraison est effectuée sous 2-3 jours ouvrés dans tout le Maroc."
              },
              {
                q: "Comment suivre ma commande ?",
                a: "Un numéro de suivi vous sera envoyé par email dès l'expédition."
              },
              {
                q: "Les produits sont-ils garantis ?",
                a: "Oui, tous nos produits sont 100% authentiques et conformes aux normes."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-bold text-blue-950 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}