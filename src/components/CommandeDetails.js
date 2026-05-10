import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt, 
  faBox, 
  faShoppingCart,
  faMoneyBillWave,
  faReceipt,
  faCheckCircle,
  faTruck
} from '@fortawesome/free-solid-svg-icons';

export default function CommandeDetails({ client }) {
  // 🔐 Protection obligatoire
  const panier = Array.isArray(client?.panier) ? client.panier : [];

  const totalCommande = panier.reduce(
    (total, item) => total + Number(item.Total_A_Payer || 0),
    0
  );

  // Formatage de la date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      {/* Header avec dégradé */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <FontAwesomeIcon icon={faReceipt} className="mr-3 text-blue-300" />
              Détails de la commande
            </h2>
            <p className="text-blue-200 mt-1 text-sm">
              Référence commande: #{client.idClient?.toString().padStart(6, '0')}
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
            <span className="text-sm font-medium">Commande confirmée</span>
          </div>
        </div>
      </div>

      {/* Informations client */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-blue-950 mb-4 flex items-center">
          <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-600" />
          Informations client
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faUser} className="text-blue-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Nom complet</p>
              <p className="font-medium text-gray-800">{client.nomClient || 'Non renseigné'}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faPhone} className="text-blue-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Téléphone</p>
              <a href={`tel:${client.numTelephone}`} className="font-medium text-blue-600 hover:underline">
                {client.numTelephone || 'Non renseigné'}
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <a href={`mailto:${client.email}`} className="font-medium text-blue-600 hover:underline">
                {client.email || 'Non renseigné'}
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Adresse de livraison</p>
              <p className="font-medium text-gray-800">{client.adresse || 'Non renseignée'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-blue-950 mb-4 flex items-center">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-blue-600" />
          Produits commandés
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({panier.length} article{panier.length > 1 ? 's' : ''})
          </span>
        </h3>

        {panier.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 text-center">
            <FontAwesomeIcon icon={faBox} className="text-4xl text-yellow-400 mb-3" />
            <p className="text-gray-700">Aucune commande trouvée pour ce client</p>
            <p className="text-sm text-gray-500 mt-1">Le panier est vide</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Produit</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Prix unitaire</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Total à payer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {panier.map((p, index) => (
                    <tr key={p.idPanier || index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          {p.image && (
                            <img 
                              src={`http://127.0.0.1:8000/storage/${p.image}`} 
                              alt={p.nomProduit}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-800">{p.nomProduit}</p>
                            {p.quantite && (
                              <p className="text-xs text-gray-500">Quantité: {p.quantite}</p>
                            )}
                          </div>
                        </div>
                       </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-medium text-gray-700">{p.prix} DH</span>
                       </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-bold text-blue-950">{p.Total_A_Payer} DH</span>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Résumé de la commande */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-col items-end">
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sous-total</span>
                    <span className="text-gray-700">{totalCommande} DH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Livraison</span>
                    <span className="text-green-600 font-medium">Gratuite</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span className="text-blue-950">Total</span>
                    <span className="text-blue-950">{totalCommande} DH</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer avec statut */}
      {panier.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FontAwesomeIcon icon={faTruck} className="text-blue-600" />
              <span>Livraison estimée: 2-3 jours ouvrés</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Commande en cours de traitement</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}