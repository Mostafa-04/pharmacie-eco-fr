import Nav from "./components/nav";
import Contenu from "./components/contenu";
import Produit from "./components/produit";
import Apropos from "./components/apropos";
import Contact from "./components/contact";
import Footer from "./components/footer";
import AvisClient from "./components/avisClient";
import Offre from "./components/offre";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AjouterProduit from "./components/ajouterProduit";
import { useState } from "react";
import Panier from "./components/panier";
import Detail from "./components/detail";
import AjouterCategorie from "./components/ajouterCategorie";
import Login from "./components/login";
import ContactsAdmin from "./components/ContactsAdmin";
import Commandes from "./components/Commandes";
export default function App() {
  const [panier , setPanier] = useState([])
  const ajouterAuPanier = (produit) =>{
    setPanier([...panier,produit])
  }
  console.log(panier)
  return (
    <>
      <Router>
        <div class="hero_area">
          <Routes>
            <Route path="/" element={<Contenu />} />
            <Route path="/produit" element={<Produit ajouter={ajouterAuPanier}/>} />
            <Route path="/apropos" element={<Apropos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ajouter-produit" element={<AjouterProduit/>} />
            <Route path="/ajouter-categorie" element={<AjouterCategorie/>} />
            <Route path="/panier" element={<Panier Pa={panier}/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/detail/:id" element={<Detail ajouter={ajouterAuPanier}/>} />
            <Route path="/contacts" element={<ContactsAdmin/>} />
            <Route path="/commands" element={<Commandes/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
