import axios from "axios";
import { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";


export default function AjouterProduit() {
  const [produit, setProduit] = useState({
    idProduit: "",
    nomProduit: "",
    prix: "",
    description: "",
    image: "",
    idCategorie: "",
  });
  const [dataCategorie, setDataCategorie] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/AfficherListCategories")
      .then((res) => {
        setDataCategorie(res.data);
      });
  }, []);

  const getValueD = (event) => {
    if (event.target.name === "image") {
      setProduit((prev) => ({
        ...prev,
        image: event.target.files[0],
      }));
    } else {
      setProduit((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const Ajouter = async () => {
    const ProduitData = new FormData();
    ProduitData.append("nomProduit", produit.nomProduit);
    ProduitData.append("image", produit.image);
    ProduitData.append("prix", produit.prix);
    ProduitData.append("description", produit.description);
    ProduitData.append("idCategorie", produit.idCategorie);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ajouterProduit",
        ProduitData
      );
      if (response.status === 201) {
        alert("bien ajouté");
      }
    } catch (error) {
      alert("Erreur lors de l'ajout :", error);
    }
  };

  return (
    
    <div className="">
      <NavbarAdmin />
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form encType="multipart/form-data">
            <h5 className="text-center mb-4">Ajouter un Produit</h5>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                name="image"
                onChange={getValueD}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Prix"
                name="prix"
                onChange={getValueD}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nom produit"
                name="nomProduit"
                onChange={getValueD}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                onChange={getValueD}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="idCategorie">
                <strong>Categorie :</strong>
              </label>
              <select
                name="idCategorie"
                className="form-select"
                onChange={getValueD}
                value={produit.idCategorie}
              >
                <option value="">Veuillez selectionnez le nom Categorie</option>
                {dataCategorie.map((e) => (
                  <option key={e.idCategorie} value={e.idCategorie}>
                    {e.nomCategorie}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center">
              <button className="btn btn-primary" type="button" onClick={Ajouter}>
                <i className="bi bi-database-add" style={{ paddingRight: "13px" }}></i>
                Ajouter Produit
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
