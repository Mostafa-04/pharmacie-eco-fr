import React, { useState } from "react";
import Nav from "./nav";
import Footer from "./footer";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Panier({Pa}){
    const [newClient , setNewCLient] = useState({nomClient:'',numTelephone:'',email:'',adresse:''})
    const getValue = (event) => {
        setNewCLient((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
    };
    const navigate = useNavigate();
    let total = 0;
    const SauvegarderPanier = async() =>{
      const res = await axios.post('http://127.0.0.1:8000/api/ajjClient',newClient)
      if(res.status == 201){
        const idC = res.data.client.idClient;
        const p = Pa.length;
        for(let i=0;i<p;i++){
          const produitDispoPanier = Pa[i];
          const formData = new FormData();
          formData.append('nomProduit', produitDispoPanier.nomProduit);
          formData.append('image', produitDispoPanier.image);
          formData.append('date_fin', produitDispoPanier.date_fin);
          formData.append('prix', produitDispoPanier.prix);
          formData.append('idClient', produitDispoPanier.idClient);
          formData.append('Total_A_Payer', total);
          await axios.post(`http://127.0.0.1:8000/api/ajjPanier/${idC}`,formData);
        }
        Swal.fire({
          title: "Success!",
          text: "Votre Reservation a été bien Sauvegarder ",
          imageUrl: "images/img1.png",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
        navigate('/produit')
      }else{
        alert('error')
      }
    }
    return <>
    <Nav/>
      <section class="contact_section">
        <div class="container pt-5">
          <div class="heading_container">
            <h2 class="">Votre Panier</h2>
          </div>
        </div>
        <div class="container container-bg">
          <div class="row">
            <div class="col-lg-7 col-md-6 px-0">
              <div class="map_container">
                <div class="map-responsive">
                  <table className="table table-striped">
                    <thead className="p-5">
                        <th>Image Produit</th>
                        <th>Nom Produit</th>
                        <th>Prix Produit</th>
                    </thead>
                    <tbody>
                        {
                            Pa.length > 0 ?
                                Pa.map((p)=>{
                                    total+=p.prix
                                    return <tr>
                                        <td><img src={`http://127.0.0.1:8000/storage/${p.image}`} style={{width:'120px'}}/></td>
                                        <td>{p.nomProduit}</td>
                                        <td>{p.prix} Dhs</td>
                                    </tr>
                                })
                            :
                            <tr className="colspan-7">
                                <td className="text-center" colSpan="3"><b>Aucun Produit dans Cette Panier</b></td>
                            </tr>
                        }
                    </tbody>
                  </table>
                  <h6 className="pl-3">Le total A Payer : {total} {total === 0 ? 'Dh' : 'Dhs' }</h6>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-5 px-0">
            <div class="container">
                <div class="heading_container">
                    <h4 class="pt-5">Confirmer Votre Reservation</h4>
                </div>
            </div>
              <form action="#">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    name="nomClient"
                    onChange={getValue}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={getValue}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Phone"
                    name="numTelephone"
                    onChange={getValue}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    class="message-box"
                    placeholder="Adresse"
                    name="adresse"
                    onChange={getValue}
                  />
                </div>
                <div class="d-flex ">
                  <button type="button" onClick={SauvegarderPanier}>Sauvegarder Reservation</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
}