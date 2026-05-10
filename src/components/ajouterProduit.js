import axios from "axios";
import { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faTag, 
  faDollarSign, 
  faAlignLeft, 
  faImage, 
  faDatabase, 
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

export default function AjouterProduit() {
  const [produit, setProduit] = useState({
    idProduit: "",
    nomProduit: "",
    prix: "",
    description: "",
    image: null,
    idCategorie: "",
  });
  const [dataCategorie, setDataCategorie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/AfficherListCategories")
      .then((res) => {
        setDataCategorie(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories:", error);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible de charger les catégories",
          confirmButtonColor: "#172554",
        });
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!produit.nomProduit) newErrors.nomProduit = "Le nom du produit est requis";
    if (!produit.prix) newErrors.prix = "Le prix est requis";
    else if (isNaN(produit.prix) || produit.prix <= 0) newErrors.prix = "Prix invalide";
    if (!produit.description) newErrors.description = "La description est requise";
    if (!produit.idCategorie) newErrors.idCategorie = "La catégorie est requise";
    if (!produit.image) newErrors.image = "L'image est requise";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getValueD = (event) => {
    if (event.target.name === "image") {
      const file = event.target.files[0];
      setProduit((prev) => ({
        ...prev,
        image: file,
      }));
      
      // Créer un aperçu de l'image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setProduit((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
      // Effacer l'erreur du champ
      if (errors[event.target.name]) {
        setErrors({ ...errors, [event.target.name]: "" });
      }
    }
  };

  const Ajouter = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Champs manquants",
        text: "Veuillez remplir tous les champs obligatoires",
        confirmButtonColor: "#172554",
      });
      return;
    }

    setLoading(true);
    
    const ProduitData = new FormData();
    ProduitData.append("nomProduit", produit.nomProduit);
    ProduitData.append("image", produit.image);
    ProduitData.append("prix", produit.prix);
    ProduitData.append("description", produit.description);
    ProduitData.append("idCategorie", produit.idCategorie);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ajouterProduit",
        ProduitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Produit ajouté avec succès !",
          text: "Le produit a bien été enregistré dans la base de données",
          confirmButtonColor: "#172554",
          showConfirmButton: true,
          timer: 3000
        });
        
        // Réinitialiser le formulaire
        setProduit({
          idProduit: "",
          nomProduit: "",
          prix: "",
          description: "",
          image: null,
          idCategorie: "",
        });
        setImagePreview(null);
        setErrors({});
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error.response?.data?.message || "Une erreur s'est produite lors de l'ajout du produit",
        confirmButtonColor: "#172554",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <FontAwesomeIcon icon={faBox} className="text-3xl text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">
              Ajouter un Produit
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
                {/* Image Upload */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Image du produit *
                  </label>
                  <div className="relative">
                    <div 
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                        errors.image ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                      onClick={() => document.getElementById('imageInput').click()}
                    >
                      <input
                        type="file"
                        id="imageInput"
                        className="hidden"
                        accept="image/*"
                        name="image"
                        onChange={getValueD}
                      />
                      {imagePreview ? (
                        <div className="relative">
                          <img 
                            src={imagePreview} 
                            alt="Aperçu" 
                            className="max-h-48 mx-auto rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setImagePreview(null);
                              setProduit({ ...produit, image: null });
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <FontAwesomeIcon icon={faTimesCircle} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faUpload} className="text-4xl text-gray-400 mb-2" />
                          <p className="text-gray-500">Cliquez ou glissez une image ici</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG jusqu'à 5MB</p>
                        </>
                      )}
                    </div>
                    {errors.image && (
                      <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                    )}
                  </div>
                </div>

                {/* Nom Produit */}
                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    <FontAwesomeIcon icon={faTag} className="mr-2 text-blue-600" />
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                      errors.nomProduit ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:border-transparent'
                    }`}
                    placeholder="Entrez le nom du produit"
                    name="nomProduit"
                    value={produit.nomProduit}
                    onChange={getValueD}
                  />
                  {errors.nomProduit && (
                    <p className="text-red-500 text-sm mt-1">{errors.nomProduit}</p>
                  )}
                </div>

                {/* Prix */}
                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    <FontAwesomeIcon icon={faDollarSign} className="mr-2 text-blue-600" />
                    Prix (Dhs) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                      errors.prix ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:border-transparent'
                    }`}
                    placeholder="0.00"
                    name="prix"
                    value={produit.prix}
                    onChange={getValueD}
                  />
                  {errors.prix && (
                    <p className="text-red-500 text-sm mt-1">{errors.prix}</p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">
                    <FontAwesomeIcon icon={faAlignLeft} className="mr-2 text-blue-600" />
                    Description *
                  </label>
                  <textarea
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none ${
                      errors.description ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:border-transparent'
                    }`}
                    rows="4"
                    placeholder="Décrivez le produit..."
                    name="description"
                    value={produit.description}
                    onChange={getValueD}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Catégorie */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Catégorie *
                  </label>
                  <select
                    name="idCategorie"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none bg-white ${
                      errors.idCategorie ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:border-transparent'
                    }`}
                    onChange={getValueD}
                    value={produit.idCategorie}
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {dataCategorie.map((e) => (
                      <option key={e.idCategorie} value={e.idCategorie}>
                        {e.nomCategorie}
                      </option>
                    ))}
                  </select>
                  {errors.idCategorie && (
                    <p className="text-red-500 text-sm mt-1">{errors.idCategorie}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={Ajouter}
                    disabled={loading}
                    className="flex-1 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        <span>Ajout en cours...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faDatabase} />
                        <span>Ajouter le produit</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setProduit({
                        idProduit: "",
                        nomProduit: "",
                        prix: "",
                        description: "",
                        image: null,
                        idCategorie: "",
                      });
                      setImagePreview(null);
                      setErrors({});
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                  >
                    Réinitialiser
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50 rounded-2xl p-6 text-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-blue-600 mb-2" />
            <p className="text-gray-700 text-sm">
              Assurez-vous que toutes les informations sont correctes avant d'ajouter le produit.
              Les champs marqués d'un * sont obligatoires.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}