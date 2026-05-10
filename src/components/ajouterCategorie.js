import axios from "axios";
import { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTags, 
  faDatabase, 
  faSpinner, 
  faPlus,
  faCheckCircle,
  faTimesCircle,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

export default function AjouterCategorie() {
  const [Categorie, setCat] = useState({
    nomCategorie: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!Categorie.nomCategorie.trim()) {
      newErrors.nomCategorie = "Le nom de la catégorie est requis";
    } else if (Categorie.nomCategorie.length < 3) {
      newErrors.nomCategorie = "Le nom doit contenir au moins 3 caractères";
    } else if (Categorie.nomCategorie.length > 50) {
      newErrors.nomCategorie = "Le nom ne doit pas dépasser 50 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getValueD = (event) => {
    setCat((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    // Effacer l'erreur du champ
    if (errors[event.target.name]) {
      setErrors({ ...errors, [event.target.name]: "" });
    }
  };

  const Ajouter = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Champ invalide",
        text: "Veuillez entrer un nom de catégorie valide",
        confirmButtonColor: "#172554",
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ajouter-categorie",
        Categorie
      );
      
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Catégorie ajoutée !",
          text: `La catégorie "${Categorie.nomCategorie}" a été créée avec succès`,
          confirmButtonColor: "#172554",
          showConfirmButton: true,
          timer: 3000
        });
        
        // Réinitialiser le formulaire
        setCat({ nomCategorie: "" });
        setErrors({});
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      
      let errorMessage = "Une erreur s'est produite lors de l'ajout de la catégorie";
      
      if (error.response?.status === 409) {
        errorMessage = "Cette catégorie existe déjà";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: errorMessage,
        confirmButtonColor: "#172554",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      Ajouter();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-4 shadow-lg">
              <FontAwesomeIcon icon={faTags} className="text-3xl text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">
              Ajouter une Catégorie
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">
              Créez une nouvelle catégorie pour organiser vos produits
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
            <div className="p-6 md:p-8">
              <form onSubmit={(e) => e.preventDefault()} onKeyPress={handleKeyPress}>
                {/* Category Name Input */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    <FontAwesomeIcon icon={faFolderOpen} className="mr-2 text-blue-600" />
                    Nom de la catégorie *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                        errors.nomCategorie 
                          ? 'border-red-400 focus:ring-red-500 bg-red-50' 
                          : 'border-gray-300 focus:border-transparent hover:border-blue-400'
                      }`}
                      placeholder="Ex: Médicaments, Cosmétiques, Parapharmacie..."
                      name="nomCategorie"
                      value={Categorie.nomCategorie}
                      onChange={getValueD}
                      autoFocus
                    />
                    {Categorie.nomCategorie && !errors.nomCategorie && (
                      <FontAwesomeIcon 
                        icon={faCheckCircle} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                      />
                    )}
                    {errors.nomCategorie && (
                      <FontAwesomeIcon 
                        icon={faTimesCircle} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                      />
                    )}
                  </div>
                  {errors.nomCategorie && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FontAwesomeIcon icon={faTimesCircle} className="mr-1 text-xs" />
                      {errors.nomCategorie}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-2">
                    Minimum 3 caractères, maximum 50 caractères
                  </p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faTags} className="text-blue-600 text-sm" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">
                        À propos des catégories
                      </h4>
                      <p className="text-xs text-blue-700">
                        Les catégories aident à organiser vos produits et permettent aux clients 
                        de trouver plus facilement ce qu'ils cherchent.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={Ajouter}
                    disabled={loading}
                    className="flex-1 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        <span>Ajout en cours...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Ajouter la catégorie</span>
                      </>
                    )}
                  </button>
                  
                  {Categorie.nomCategorie && (
                    <button
                      type="button"
                      onClick={() => {
                        setCat({ nomCategorie: "" });
                        setErrors({});
                      }}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                      <span>Effacer</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Recent Categories Preview (Optionnel) */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-blue-950 mb-4 flex items-center">
              <FontAwesomeIcon icon={faTags} className="mr-2 text-blue-600" />
              Catégories existantes
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Médicaments</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Cosmétiques</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Parapharmacie</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Hygiène</span>
              <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">Bébé</span>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              * Liste indicative - Les catégories réelles apparaîtront ici
            </p>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
              <span>Nom unique</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
              <span>Sans caractères spéciaux</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
              <span>Min 3 caractères</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}