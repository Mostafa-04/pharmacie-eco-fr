import { Link, useNavigate } from "react-router-dom";
import Footer from "./footer";
import Nav from "./nav";
import Offre from "./offre";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
export default function Produit({ajouter}){
  const [listProduit , setlistproduits]=useState([])
  const [recherche,setRecherche]=useState("")
  console.log(recherche)
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/AfficherListProduits').then((res)=>{
      setlistproduits(res.data)
    })
  },[])
  const AjouterPanier = (produit) =>{
    ajouter(produit)
    Swal.fire({
      title: "Produit bien ajouté Au Panier",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });

  }
  return (
      <>
        <Nav />
        <section class="shop_section layout_padding">
          <div class="container">
            <div class="heading_container heading_center">
              <h2>Listes Produits</h2>
            <input type="text" name="recherche" class='form-control' placeholder="Chercher Sur Votre produit Préféré" onChange={(event)=>setRecherche(event.target.value)} />
            </div>
            <div class="row">
              {
                listProduit.filter((i)=>{
                  return recherche.toLowerCase()==='' ? i : i.nomProduit.toLowerCase().includes(recherche);
                }).map((e)=>{
                  return <>
                  
                    <div class="col-sm-6 col-md-4 col-lg-3">
                      <Link to={`/detail/${e.idProduit}`}>
                      <div class="box">
                        <div>
                          <div class="img-box">
                            <img src={`http://127.0.0.1:8000/storage/${e.image}`}/>
                          </div>
                          <div class="detail-box">
                            <h6>{e.nomProduit}</h6>
                            <h6>
                              Prix {' '} <br/>
                              <span>{e.prix} Dhs</span>
                            </h6>
                          </div>
                          
                          <div class="new">
                            <span>New</span>
                          </div>
                          <button type="button" onClick={()=>AjouterPanier(e)}>
                            <i class="bi bi-cart-plus"></i>
                          </button>
                        </div>
                      </div>
                      </Link>
                    </div>
                  
                  </>
                })
              }
            </div>
          </div>
        </section>
        <Offre />
        <Footer />
      </>
    );
}