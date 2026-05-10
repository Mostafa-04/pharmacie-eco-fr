import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faShoppingCart, 
  faTag, 
  faBox, 
  faStar,
  faTruck,
  faShieldAlt,
  faUndo,
  faCheckCircle,
  faHeart,
  faShare
} from '@fortawesome/free-solid-svg-icons';

export default function Detail({ ajouter }) {
  const { id } = useParams();
  const [listProduit, setListProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/AfficherListProduits')
      .then((res) => {
        setListProduits(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setLoading(false);
      });
  }, []);

  const DetailProduit = listProduit.filter((e) => e.idProduit == id);
  const product = DetailProduit[0];

  const AjouterPanier = (produit) => {
    const productWithQuantity = { ...produit, quantite: quantity };
    ajouter(productWithQuantity);
    
    Swal.fire({
      title: "Produit ajouté au panier !",
      text: `${produit.nomProduit} a été ajouté avec succès`,
      icon: "success",
      confirmButtonColor: "#172554",
      confirmButtonText: "Continuer",
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster'
      },
      timer: 2000,
      showConfirmButton: false
    });
  };

  const RetourToProduits = () => {
    navigate('/produit');
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-950 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement du produit...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <FontAwesomeIcon icon={faBox} className="text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Produit non trouvé</h2>
            <p className="text-gray-500 mb-6">Le produit que vous recherchez n'existe pas</p>
            <button
              onClick={RetourToProduits}
              className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Retour aux produits
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      
      <section className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
              <span>/</span>
              <Link to="/produit" className="hover:text-blue-600 transition-colors">Produits</Link>
              <span>/</span>
              <span className="text-blue-950 font-semibold">{product.nomProduit}</span>
            </nav>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Column - Image Gallery */}
              <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img
                      src={`http://127.0.0.1:8000/storage/${product.image}`}
                      alt={product.nomProduit}
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Nouveau
                    </div>
                  </div>
                  
                  {/* Thumbnail Gallery (si plusieurs images) */}
                  <div className="flex mt-4 space-x-3">
                    {[product.image].map((img, idx) => (
                      <div
                        key={idx}
                        className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                          activeImage === idx ? 'ring-2 ring-blue-500 shadow-lg' : 'opacity-70 hover:opacity-100'
                        }`}
                        onClick={() => setActiveImage(idx)}
                      >
                        <img
                          src={`http://127.0.0.1:8000/storage/${img}`}
                          alt={`Vue ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div className="lg:w-1/2 p-8 lg:p-12">
                {/* Product Title */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="text-sm" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(24 avis clients)</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-3">
                    {product.nomProduit}
                  </h1>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-blue-950">{product.prix} Dhs</span>
                    {product.ancienPrix && (
                      <>
                        <span className="text-lg text-gray-400 line-through">{product.ancienPrix} Dhs</span>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                          -{Math.round(((product.ancienPrix - product.prix) / product.ancienPrix) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || "Aucune description disponible pour ce produit."}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faTruck} className="text-blue-600" />
                    <span>Livraison gratuite</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faUndo} className="text-blue-600" />
                    <span>Retour sous 14 jours</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600" />
                    <span>Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600" />
                    <span>Qualité garantie</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Quantité</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decreaseQuantity}
                      className="w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-blue-500 transition-all duration-300"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-xl font-semibold">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-blue-500 transition-all duration-300"
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-500 ml-2">
                      {quantity > 1 ? `${quantity} produits` : 'produit'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <button
                    onClick={RetourToProduits}
                    className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Continuer mes achats</span>
                  </button>
                  <button
                    onClick={() => AjouterPanier(product)}
                    className="flex-1 bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>Ajouter au panier</span>
                  </button>
                  

                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section (Optionnel) */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-blue-950 mb-6 flex items-center">
              <FontAwesomeIcon icon={faBox} className="mr-2" />
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {listProduit.filter(p => p.idProduit != id).slice(0, 4).map((related) => (
                <div
                  key={related.idProduit}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  onClick={() => navigate(`/detail/${related.idProduit}`)}
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${related.image}`}
                    alt={related.nomProduit}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{related.nomProduit}</h3>
                    <p className="text-blue-950 font-bold">{related.prix} Dhs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}