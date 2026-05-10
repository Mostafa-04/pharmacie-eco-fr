import { Link, useNavigate } from "react-router-dom";
import Footer from "./footer";
import Nav from "./nav";
import Offre from "./offre";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faStar, faEye, faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Produit({ ajouter }) {
  const [listProduit, setlistproduits] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [loading, setLoading] = useState(true);
  const [categorieFilter, setCategorieFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/AfficherListProduits')
      .then((res) => {
        setlistproduits(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des produits:", error);
        setLoading(false);
      });
  }, []);

  const AjouterPanier = (produit, event) => {
    event.preventDefault();
    event.stopPropagation();
    ajouter(produit);
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

  // Filtrer les produits
  const filteredProducts = listProduit.filter((i) => {
    const matchesSearch = recherche.toLowerCase() === '' || 
      i.nomProduit.toLowerCase().includes(recherche.toLowerCase()) ||
      (i.description && i.description.toLowerCase().includes(recherche.toLowerCase()));
    
    const matchesCategory = categorieFilter === "all" || i.categorie === categorieFilter;
    
    let matchesPrice = true;
    if (priceRange === "0-100") matchesPrice = i.prix <= 100;
    else if (priceRange === "100-200") matchesPrice = i.prix >= 100 && i.prix <= 200;
    else if (priceRange === "200+") matchesPrice = i.prix >= 200;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Extraire les catégories uniques
  const categories = ["all", ...new Set(listProduit.map(p => p.categorie).filter(Boolean))];

  if (loading) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-950 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des produits...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <section className="bg-gray-50 min-h-screen py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 mb-4">
              Nos Produits
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Découvrez notre large gamme de produits pharmaceutiques de qualité
            </p>
          </div>

          {/* Search and Filters Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={recherche}
                  onChange={(event) => setRecherche(event.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-3 pl-10 pr-8 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="all">Tous prix</option>
                  <option value="0-100">Moins de 100 Dhs</option>
                  <option value="100-200">100 - 200 Dhs</option>
                  <option value="200+">Plus de 200 Dhs</option>
                </select>
                <FontAwesomeIcon 
                  icon={faFilter} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-500">
              {filteredProducts.length} produit(s) trouvé(s)
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((produit) => (
                <div key={produit.idProduit} className="group">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <Link to={`/detail/${produit.idProduit}`}>
                      {/* Product Image */}
                      <div className="relative overflow-hidden bg-gray-100 h-64">
                        <img
                          src={`http://127.0.0.1:8000/storage/${produit.image}`}
                          alt={produit.nomProduit}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Badge New */}
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Nouveau
                        </div>
                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-white text-blue-950 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                            <FontAwesomeIcon icon={faEye} />
                            <span>Voir détails</span>
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        <div className="mb-2">
                          {produit.categorie && (
                            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                              {produit.categorie}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                          {produit.nomProduit}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {produit.description || "Description non disponible"}
                        </p>
                        
                        {/* Rating (exemple) */}
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-2">(24 avis)</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-blue-950">{produit.prix} Dhs</span>
                            {produit.ancienPrix && (
                              <span className="text-sm text-gray-400 line-through ml-2">
                                {produit.ancienPrix} Dhs
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(event) => AjouterPanier(produit, event)}
                            className="bg-blue-950 hover:bg-blue-800 text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                          >
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span className="text-sm font-medium">Ajouter</span>
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button (optionnel) */}
          {filteredProducts.length > 8 && (
            <div className="text-center mt-12">
              <button className="bg-white border-2 border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                Voir plus de produits
              </button>
            </div>
          )}
        </div>
      </section>
      <Offre />
      <Footer />
    </>
  );
}