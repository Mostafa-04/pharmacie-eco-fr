import React, { useEffect, useState } from "react";
import axios from "axios";
import CommandeDetails from "./CommandeDetails";
import NavbarAdmin from "./NavbarAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faUser, 
  faEnvelope, 
  faPhone, 
  faEye, 
  faShoppingCart,
  faSpinner,
  faUsers,
  faTruck,
  faCheckCircle,
  faClock,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

export default function Commandes() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/commandes");
      setClients(res.data.data);
      setError(null);
    } catch (err) {
      console.error("Erreur API :", err);
      setError("Erreur de chargement des commandes. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les clients par recherche
  const filteredClients = clients.filter(client => 
    client.nomClient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.numTelephone?.includes(searchTerm)
  );

  // Statistiques
  const stats = {
    total: clients.length,
    avecCommandes: clients.filter(c => c.commandes && c.commandes.length > 0).length,
    totalCommandes: clients.reduce((sum, c) => sum + (c.commandes?.length || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faBox} className="text-2xl text-blue-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-950">
              Gestion des Commandes
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            Gérez et suivez toutes les commandes de vos clients
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-sm opacity-90 mt-1">Clients total</p>
              </div>
              <FontAwesomeIcon icon={faUsers} className="text-4xl opacity-50" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold">{stats.avecCommandes}</p>
                <p className="text-sm opacity-90 mt-1">Clients actifs</p>
              </div>
              <FontAwesomeIcon icon={faShoppingCart} className="text-4xl opacity-50" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold">{stats.totalCommandes}</p>
                <p className="text-sm opacity-90 mt-1">Commandes totales</p>
              </div>
              <FontAwesomeIcon icon={faTruck} className="text-4xl opacity-50" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Liste Clients */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="mr-2" />
                    Liste des Clients
                  </h2>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {filteredClients.length} clients
                  </span>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin" />
                  <p className="mt-3 text-gray-600">Chargement des clients...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl mx-4">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                    {error}
                  </div>
                </div>
              ) : filteredClients.length === 0 ? (
                <div className="text-center py-12">
                  <FontAwesomeIcon icon={faUsers} className="text-5xl text-gray-300 mb-3" />
                  <p className="text-gray-500">Aucun client trouvé</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client.idClient}
                      className={`p-5 hover:bg-gray-50 transition-all duration-300 cursor-pointer ${
                        selectedClient?.idClient === client.idClient 
                          ? 'bg-blue-50 border-l-4 border-blue-600' 
                          : ''
                      }`}
                      onClick={() => setSelectedClient(client)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                              {client.nomClient?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {client.nomClient}
                              </h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                                <span>{client.email}</span>
                              </div>
                              {client.numTelephone && (
                                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                  <FontAwesomeIcon icon={faPhone} className="text-xs" />
                                  <span>{client.numTelephone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedClient(client)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Détails commande */}
          <div className="lg:w-3/5">
            {selectedClient ? (
              <CommandeDetails client={selectedClient} />
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faShoppingCart} className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucune commande sélectionnée
                </h3>
                <p className="text-gray-500">
                  Sélectionnez un client dans la liste pour voir ses commandes
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={fetchCommandes}
            disabled={loading}
            className="bg-blue-950 hover:bg-blue-800 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faSpinner} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}