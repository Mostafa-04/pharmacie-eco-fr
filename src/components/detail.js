import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "./nav";
import Swal from "sweetalert2";
export default function Detail({ajouter}){
    const {id}=useParams()
    const [listProduit , setlistproduits]=useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/AfficherListProduits').then((res)=>{
          setlistproduits(res.data)
        })
      },[])
    const DetailProduit = listProduit.filter((e)=>e.idProduit == id)
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
    const RetourToProduits = () =>{
        navigate('/produit')
    }
    return <>
    <Nav/>
        <div className="row">
                {
                    DetailProduit.map((p)=>{
                        return <>
                            <div className="col-md-6 col-lg-6">
                                <img src={`http://127.0.0.1:8000/storage/${p.image}`} style={{width:'100%'}}/>
                            </div>
                            <div className="col-md-6 col-lg-6 pt-5">
                                <div class="detail-box">
                                <h2 className="pb-5">Detail Produit</h2>
                                <h6 className="pb-4">Nom Produit : {p.nomProduit}</h6>
                                <h6 className="pb-4">
                                Prix Produit : 
                                <span>{p.prix} Dhs</span>
                                </h6>
                                <h6 className="pb-4">Description Sur Ce Produit : {p.description}</h6>
                                <div className="row pt-5">
                                    <div className="col-md-6 col-lg-6">
                                        <button type="button" style={{width:'90%'}} onClick={RetourToProduits}>
                                            <i class="bi bi-arrow-left-circle"></i> Retour
                                        </button>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <button type="button" onClick={()=>AjouterPanier(p)}>
                                            <i class="bi bi-cart-plus"></i> Ajouter Au panier
                                        </button>
                                    </div>
                                </div>
                               
                                
                            </div>
                            </div>
                        </>
                    })
                }
        </div>
    </>
}