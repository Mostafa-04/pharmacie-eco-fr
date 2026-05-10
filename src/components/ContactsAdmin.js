import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from './NavbarAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelopeOpen, 
  faArrowRotateRight, 
  faPeopleGroup, 
  faExclamationTriangle, 
  faQuestionCircle, 
  faEnvelope,
  faSearch,
  faXmarkCircle,
  faPhone,
  faCalendar,
  faMessage,
  faEye,
  faTrash,
  faUserCircle,
  faChevronLeft,
  faChevronRight,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChoice, setFilterChoice] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/AfficherListContacts');
      setContacts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Erreur de chargement des contacts. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.nomContact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.numTel?.includes(searchTerm) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterChoice === 'all' || 
      contact.choix === filterChoice ||
      contact.autre_choix === filterChoice;

    return matchesSearch && matchesFilter;
  });

  const uniqueChoices = [...new Set(contacts.map(contact => contact.choix || contact.autre_choix).filter(Boolean))];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getChoiceLabel = (contact) => {
    return contact.choix || contact.autre_choix || 'Non spécifié';
  };

  const getPriorityColor = (choice) => {
    const priorityMap = {
      'urgent': 'red',
      'important': 'orange',
      'information': 'blue',
      'réclamation': 'red',
      'suggestion': 'green',
      'question': 'purple'
    };
    const color = priorityMap[choice?.toLowerCase()] || 'gray';
    const bgMap = {
      red: 'bg-red-100 text-red-800',
      orange: 'bg-orange-100 text-orange-800',
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      gray: 'bg-gray-100 text-gray-800'
    };
    return bgMap[color];
  };

  const stats = [
    { 
      label: 'Total Contacts', 
      value: contacts.length, 
      icon: faPeopleGroup,
      bgClass: 'bg-gradient-to-r from-blue-600 to-blue-500'
    },
    { 
      label: 'Contacts Urgents', 
      value: contacts.filter(c => c.choix?.toLowerCase().includes('urgent')).length, 
      icon: faExclamationTriangle,
      bgClass: 'bg-gradient-to-r from-red-600 to-red-500'
    },
    { 
      label: 'Questions', 
      value: contacts.filter(c => c.choix?.toLowerCase().includes('question')).length, 
      icon: faQuestionCircle,
      bgClass: 'bg-gradient-to-r from-purple-600 to-purple-500'
    },
    { 
      label: 'Emails Uniques', 
      value: new Set(contacts.map(c => c.email)).size, 
      icon: faEnvelope,
      bgClass: 'bg-gradient-to-r from-green-600 to-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faEnvelopeOpen} className="text-2xl text-blue-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-950">
                Gestion des Contacts
              </h1>
            </div>
            <p className="text-gray-600 ml-14">
              {filteredContacts.length} contact(s) trouvé(s)
            </p>
          </div>
          
          <button 
            onClick={fetchContacts}
            disabled={loading}
            className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faArrowRotateRight} className={loading ? 'animate-spin' : ''} />
            <span>Actualiser</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgClass} rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm opacity-90 mt-1">{stat.label}</p>
                </div>
                <FontAwesomeIcon icon={stat.icon} className="text-4xl opacity-50" />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Rechercher par nom, email, téléphone ou message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={filterChoice}
              onChange={(e) => setFilterChoice(e.target.value)}
            >
              <option value="all">Tous les types</option>
              {uniqueChoices.map((choice, index) => (
                <option key={index} value={choice}>{choice}</option>
              ))}
            </select>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterChoice('all');
              }}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FontAwesomeIcon icon={faXmarkCircle} />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin" />
              <p className="mt-4 text-gray-600">Chargement des contacts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 text-red-800 p-4 rounded-xl max-w-md mx-auto">
                <p>{error}</p>
                <button
                  onClick={fetchContacts}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Réessayer
                </button>
              </div>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faEnvelopeOpen} className="text-5xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun contact trouvé</h3>
              <p className="text-gray-500">Aucun contact ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-950 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Nom</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Téléphone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentContacts.map((contact, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                              {contact.nomContact?.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-800">{contact.nomContact}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`tel:${contact.numTel}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                            {contact.numTel}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800 transition-colors text-sm">
                            {contact.email}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(getChoiceLabel(contact))}`}>
                            {getChoiceLabel(contact)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-600 text-sm max-w-xs truncate">
                            {contact.message?.length > 60 ? `${contact.message.substring(0, 60)}...` : contact.message}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-500 text-sm whitespace-nowrap">
                            {formatDate(contact.created_at)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleViewDetails(contact)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Voir les détails"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 py-6 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  
                  <div className="flex space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                          currentPage === index + 1
                            ? 'bg-blue-950 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center">
                  <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                  Détails du Contact
                </h3>
                <button onClick={handleCloseModal} className="text-white hover:text-gray-200 transition-colors">
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-center md:text-left">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto md:mx-0">
                    {selectedContact.nomContact?.charAt(0).toUpperCase()}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mt-3">{selectedContact.nomContact}</h4>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getPriorityColor(getChoiceLabel(selectedContact))}`}>
                    {getChoiceLabel(selectedContact)}
                  </span>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-500 mb-2">
                      <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-600" />
                      Contact
                    </h5>
                    <p>
                      <a href={`tel:${selectedContact.numTel}`} className="text-blue-600 hover:underline">
                        {selectedContact.numTel}
                      </a>
                      <br />
                      <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                        {selectedContact.email}
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-semibold text-gray-500 mb-2">
                      <FontAwesomeIcon icon={faCalendar} className="mr-2 text-blue-600" />
                      Date de contact
                    </h5>
                    <p className="text-gray-700">{formatDate(selectedContact.created_at)}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-semibold text-gray-500 mb-2">
                      <FontAwesomeIcon icon={faMessage} className="mr-2 text-blue-600" />
                      Message
                    </h5>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-700">{selectedContact.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-blue-950 text-white rounded-xl hover:bg-blue-800 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}