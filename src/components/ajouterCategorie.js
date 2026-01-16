import axios from "axios";
import { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";


export default function AjouterCategorie() {
  const [Categorie, setcat] = useState({
    nomCategorie: "",
  });
  const getValueD = (event) => {
    setcat((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
  };

  const Ajouter = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ajouter-categorie",
        Categorie
      );
      if (response.status === 201) {
        alert("bien ajouté");
      }
  };

  return (
    <div>
      <NavbarAdmin />
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form encType="multipart/form-data">
            <h5 className="text-center mb-4">Ajouter une Categorie</h5>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Categorie"
                name="nomCategorie"
                onChange={getValueD}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-primary" type="button" onClick={Ajouter}>
                <i className="bi bi-database-add" style={{ paddingRight: "13px" }}></i>
                Ajouter Categorie
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
