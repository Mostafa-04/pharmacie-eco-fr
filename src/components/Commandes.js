import React, { useEffect, useState } from "react";
import axios from "axios";
import CommandeDetails from "./CommandeDetails";
import NavbarAdmin from "./NavbarAdmin";

export default function Commandes() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/commandes")
      .then((res) => {
        setClients(res.data.data); // 👈 مهم
      })
      .catch((err) => {
        console.error("Erreur API :", err);
      });
  }, []);

  return (
    <div>
        <NavbarAdmin />
    <div className="container mt-4">
      <h2 className="text-center mb-4">📦 Gestion des commandes</h2>

      <div className="row">
        {/* Liste clients */}
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              Clients
            </div>

            <ul className="list-group list-group-flush">
              {clients.map((client) => (
                <li
                  key={client.idClient}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{client.nomClient}</strong>
                    <br />
                    <small>{client.email}</small>
                  </div>

                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setSelectedClient(client)}
                  >
                    Voir
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Détails commande */}
        <div className="col-md-7">
          {selectedClient ? (
            <CommandeDetails client={selectedClient} />
          ) : (
            <div className="alert alert-info text-center">
              Sélectionnez un client pour voir ses commandes
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
