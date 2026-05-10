import React, { useState, useEffect } from "react";
import Nav from "./nav";
import Footer from "./footer";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrashAlt, 
  faShoppingCart, 
  faUser, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faCreditCard,
  faTruck,
  faCheckCircle,
  faArrowLeft,
  faMinusCircle,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

export default function Panier({ Pa, setPa }) {
  const [newClient, setNewClient] = useState({
    nomClient: '',
    numTelephone: '',
    email: '',
    adresse: ''
  });
  console.log(Pa);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // Initialiser les quantités
  useEffect(() => {
    const initialQuantities = {};
    Pa.forEach(item => {
      initialQuantities[item.idProduit] = item.quantite || 1;
    });
    setQuantities(initialQuantities);
  }, [Pa]);

  const getValue = (event) => {
    setNewClient((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const updateQuantity = (idProduit, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [idProduit]: newQuantity
    }));
  };

  const removeFromCart = (idProduit) => {
    const updatedCart = Pa.filter(item => item.idProduit !== idProduit);
    setPa(updatedCart);
    
    Swal.fire({
      icon: "success",
      title: "Produit retiré",
      text: "Le produit a été retiré de votre panier",
      confirmButtonColor: "#172554",
      timer: 1500,
      showConfirmButton: false
    });
  };

  const calculateTotal = () => {
    return Pa.reduce((total, item) => {
      const quantity = quantities[item.idProduit] || 1;
      return total + (item.prix * quantity);
    }, 0);
  };

  const validateForm = () => {
    if (!newClient.nomClient) return "Veuillez entrer votre nom";
    if (!newClient.email) return "Veuillez entrer votre email";
    if (!newClient.numTelephone) return "Veuillez entrer votre numéro de téléphone";
    if (!newClient.adresse) return "Veuillez entrer votre adresse";
    if (Pa.length === 0) return "Votre panier est vide";
    return null;
  };

  const SauvegarderPanier = async () => {
    const validationError = validateForm();
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Champs manquants",
        text: validationError,
        confirmButtonColor: "#172554",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const total = calculateTotal();
      const res = await axios.post('http://127.0.0.1:8000/api/ajjClient', newClient);
      
      if (res.status === 201) {
        const idC = res.data.client.idClient;
        
        for (let i = 0; i < Pa.length; i++) {
          const produitDispoPanier = Pa[i];
          const quantity = quantities[produitDispoPanier.idProduit] || 1;
          const formData = new FormData();
          formData.append('nomProduit', produitDispoPanier.nomProduit);
          formData.append('image', produitDispoPanier.image);
          formData.append('date_fin', produitDispoPanier.date_fin);
          formData.append('prix', produitDispoPanier.prix * quantity);
          formData.append('quantite', quantity);
          formData.append('idClient', idC);
          formData.append('Total_A_Payer', total);
          
          await axios.post(`http://127.0.0.1:8000/api/ajjPanier/${idC}`, formData);
        }
        
        Swal.fire({
          title: "Commande confirmée !",
          text: "Votre réservation a été enregistrée avec succès",
          icon: "success",
          confirmButtonColor: "#172554",
          confirmButtonText: "OK",
          showClass: {
            popup: 'animate__animated animate__fadeInUp'
          }
        });
        
        // Rediriger vers la page produits
        navigate('/produit');
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s'est produite. Veuillez réessayer.",
        confirmButtonColor: "#172554",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal();

  return (
    <>
      <Nav />
      
      <section className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <FontAwesomeIcon icon={faShoppingCart} className="text-3xl text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">
              Votre Panier
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">
              {Pa.length} produit(s) dans votre panier
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Panier Section */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {Pa.length > 0 ? (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-950 text-white">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Produit</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Nom</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold">Quantité</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold">Prix</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {Pa.map((p) => {
                            const quantity = quantities[p.idProduit] || 1;
                            return (
                              <tr key={p.idProduit} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                  <img 
                                    src={`http://127.0.0.1:8000/storage/${p.image}`} 
                                    alt={p.nomProduit}
                                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                                  />
                                </td>
                                <td className="px-6 py-4">
                                  <h3 className="font-semibold text-gray-800">{p.nomProduit}</h3>
                                  <p className="text-sm text-gray-500">Réf: {p.idProduit}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center justify-center space-x-2">
                                    <button
                                      onClick={() => updateQuantity(p.idProduit, quantity - 1)}
                                      className="text-gray-500 hover:text-blue-600 transition-colors"
                                    >
                                      <FontAwesomeIcon icon={faMinusCircle} />
                                    </button>
                                    <span className="w-12 text-center font-semibold">{quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(p.idProduit, quantity + 1)}
                                      className="text-gray-500 hover:text-blue-600 transition-colors"
                                    >
                                      <FontAwesomeIcon icon={faPlusCircle} />
                                    </button>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <span className="font-bold text-blue-950">{p.prix * quantity} Dhs</span>
                                  {quantity > 1 && (
                                    <p className="text-xs text-gray-400">{p.prix} Dhs/unité</p>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <button
                                    onClick={() => removeFromCart(p.idProduit)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                  >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Résumé */}
                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Sous-total</span>
                        <span className="font-semibold">{total} Dhs</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Livraison</span>
                        <span className="text-green-600 font-semibold">Gratuite</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-blue-950">Total</span>
                          <span className="text-2xl font-bold text-blue-950">{total} Dhs</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-6xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Votre panier est vide</h3>
                    <p className="text-gray-500 mb-6">Ajoutez des produits à votre panier pour continuer</p>
                    <button
                      onClick={() => navigate('/produit')}
                      className="inline-flex items-center space-x-2 bg-blue-950 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                      <span>Découvrir nos produits</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Formulaire de confirmation */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-blue-950 mb-6 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-blue-600" />
                  Confirmer votre commande
                </h2>

                <form onSubmit={(e) => { e.preventDefault(); SauvegarderPanier(); }}>
                  <div className="space-y-4">
                    <div className="relative">
                      <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="nomClient"
                        placeholder="Nom complet"
                        value={newClient.nomClient}
                        onChange={getValue}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newClient.email}
                        onChange={getValue}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="numTelephone"
                        placeholder="Téléphone"
                        value={newClient.numTelephone}
                        onChange={getValue}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-5 text-gray-400" />
                      <textarea
                        name="adresse"
                        placeholder="Adresse de livraison"
                        value={newClient.adresse}
                        onChange={getValue}
                        rows="3"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="button"
                      onClick={SauvegarderPanier}
                      disabled={isSubmitting || Pa.length === 0}
                      className="w-full bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Traitement...</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faCreditCard} />
                          <span>Confirmer la commande</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Informations livraison */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <FontAwesomeIcon icon={faTruck} className="text-blue-600" />
                    <span>Livraison gratuite</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Les délais de livraison sont de 2-3 jours ouvrés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}