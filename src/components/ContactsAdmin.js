import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactsAdmin.css';
import NavbarAdmin from './NavbarAdmin';

export default function ContactsAdmin() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterChoice, setFilterChoice] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Fetch contacts from API
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

    // Filter contacts based on search and filter
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

    // Get unique choices for filter dropdown
    const uniqueChoices = [...new Set(contacts.map(contact => contact.choix || contact.autre_choix).filter(Boolean))];

    // Pagination logic
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

    const handleDeleteContact = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/contacts/${id}`);
                setContacts(contacts.filter(contact => contact.id !== id));
                alert('Contact supprimé avec succès!');
            } catch (err) {
                alert('Erreur lors de la suppression du contact.');
            }
        }
    };

    const formatDate = (dateString) => {
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
            'urgent': 'danger',
            'important': 'warning',
            'information': 'info',
            'réclamation': 'danger',
            'suggestion': 'success',
            'question': 'primary'
        };
        return priorityMap[choice?.toLowerCase()] || 'secondary';
    };

  

    return (
        <div>
            <NavbarAdmin />
        <div className="contacts-admin-container">
            {/* Header */}
            <div className="contacts-header mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="page-title">
                            <i className="bi bi-envelope-paper me-3"></i>
                            Gestion des Contacts
                        </h1>
                        <p className="page-subtitle text-muted">
                            {filteredContacts.length} contact(s) trouvé(s)
                        </p>
                    </div>
                    <div className="d-flex gap-2">
                        <button 
                            className="btn btn-outline-primary"
                            onClick={fetchContacts}
                            disabled={loading}
                        >
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Actualiser
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card stat-card bg-primary text-white">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="stat-value">{contacts.length}</h5>
                                    <p className="stat-label">Total Contacts</p>
                                </div>
                                <i className="bi bi-people-fill stat-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card stat-card bg-warning text-white">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="stat-value">
                                        {contacts.filter(c => c.choix?.toLowerCase().includes('urgent')).length}
                                    </h5>
                                    <p className="stat-label">Contacts Urgents</p>
                                </div>
                                <i className="bi bi-exclamation-triangle-fill stat-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card stat-card bg-success text-white">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="stat-value">
                                        {contacts.filter(c => c.choix?.toLowerCase().includes('question')).length}
                                    </h5>
                                    <p className="stat-label">Questions</p>
                                </div>
                                <i className="bi bi-question-circle-fill stat-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card stat-card bg-info text-white">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="stat-value">
                                        {new Set(contacts.map(c => c.email)).size}
                                    </h5>
                                    <p className="stat-label">Emails Uniques</p>
                                </div>
                                <i className="bi bi-envelope-fill stat-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Rechercher par nom, email, téléphone ou message..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={filterChoice}
                                onChange={(e) => setFilterChoice(e.target.value)}
                            >
                                <option value="all">Tous les types</option>
                                {uniqueChoices.map((choice, index) => (
                                    <option key={index} value={choice}>
                                        {choice}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button 
                                className="btn btn-outline-secondary w-100"
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterChoice('all');
                                }}
                            >
                                <i className="bi bi-x-circle me-2"></i>
                                Réinitialiser
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contacts Table */}
            <div className="card">
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Chargement...</span>
                            </div>
                            <p className="mt-3">Chargement des contacts...</p>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            {error}
                            <button 
                                className="btn btn-sm btn-outline-danger ms-3"
                                onClick={fetchContacts}
                            >
                                Réessayer
                            </button>
                        </div>
                    ) : filteredContacts.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                            <h4 className="mt-3">Aucun contact trouvé</h4>
                            <p className="text-muted">Aucun contact ne correspond à vos critères de recherche.</p>
                        </div>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Téléphone</th>
                                            <th>Email</th>
                                            <th>Type</th>
                                            <th>Message</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentContacts.map((contact, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-circle me-3">
                                                            {contact.nomContact?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <strong>{contact.nomContact}</strong>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href={`tel:${contact.numTel}`} className="text-decoration-none">
                                                        <i className="bi bi-telephone me-2"></i>
                                                        {contact.numTel}
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={`mailto:${contact.email}`} className="text-decoration-none">
                                                        <i className="bi bi-envelope me-2"></i>
                                                        {contact.email}
                                                    </a>
                                                </td>
                                                <td>
                                                    <span className={`badge bg-${getPriorityColor(getChoiceLabel(contact))}`}>
                                                        {getChoiceLabel(contact)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="message-preview">
                                                        {contact.message?.length > 50 
                                                            ? `${contact.message.substring(0, 50)}...`
                                                            : contact.message
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    {contact.created_at ? (
                                                        <small className="text-muted">
                                                            {formatDate(contact.created_at)}
                                                        </small>
                                                    ) : (
                                                        <small className="text-muted">N/A</small>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => handleViewDetails(contact)}
                                                            title="Voir les détails"
                                                        >
                                                            <i className="bi bi-eye"></i>
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
                                <nav className="mt-4">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                Précédent
                                            </button>
                                        </li>
                                        
                                        {[...Array(totalPages)].map((_, index) => (
                                            <li 
                                                key={index} 
                                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                        
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                Suivant
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Contact Detail Modal */}
            {selectedContact && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className="bi bi-person-circle me-2"></i>
                                    Détails du Contact
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-4 text-center">
                                        <div className="avatar-modal mb-3">
                                            {selectedContact.nomContact?.charAt(0).toUpperCase()}
                                        </div>
                                        <h5>{selectedContact.nomContact}</h5>
                                        <span className={`badge bg-${getPriorityColor(getChoiceLabel(selectedContact))} fs-6`}>
                                            {getChoiceLabel(selectedContact)}
                                        </span>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="mb-3">
                                            <h6 className="text-muted mb-2">
                                                <i className="bi bi-telephone me-2"></i>
                                                Contact
                                            </h6>
                                            <p>
                                                <a href={`tel:${selectedContact.numTel}`} className="text-decoration-none">
                                                    {selectedContact.numTel}
                                                </a>
                                                <br />
                                                <a href={`mailto:${selectedContact.email}`} className="text-decoration-none">
                                                    {selectedContact.email}
                                                </a>
                                            </p>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="text-muted mb-2">
                                                <i className="bi bi-calendar me-2"></i>
                                                Date de contact
                                            </h6>
                                            <p>
                                                {selectedContact.created_at 
                                                    ? formatDate(selectedContact.created_at)
                                                    : 'Non disponible'
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="text-muted mb-2">
                                                <i className="bi bi-chat-left-text me-2"></i>
                                                Message
                                            </h6>
                                            <div className="card">
                                                <div className="card-body bg-light">
                                                    <p className="mb-0">{selectedContact.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleCloseModal}
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}