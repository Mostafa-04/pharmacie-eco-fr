import React from "react";

export default function CommandeDetails({ client }) {

  // 🔐 Protection obligatoire
  const panier = Array.isArray(client?.panier) ? client.panier : [];

  const totalCommande = panier.reduce(
    (total, item) => total + Number(item.Total_A_Payer || 0),
    0
  );

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        Détails commande – {client.nomClient}
      </div>

      <div className="card-body">
        <p><strong>Téléphone :</strong> {client.numTelephone}</p>
        <p><strong>Email :</strong> {client.email}</p>
        <p><strong>Adresse :</strong> {client.adresse}</p>

        {panier.length === 0 ? (
          <div className="alert alert-warning">
            Aucune commande trouvée
          </div>
        ) : (
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark">
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Total à payer</th>
              </tr>
            </thead>
            <tbody>
              {panier.map((p) => (
                <tr key={p.idPanier}>
                  <td>{p.nomProduit}</td>
                  <td>{p.prix} DH</td>
                  <td>{p.Total_A_Payer} DH</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="alert alert-success text-end mt-3">
          <strong>Total commande :</strong> {totalCommande} DH
        </div>
      </div>
    </div>
  );
}
