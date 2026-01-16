import Nav from "./nav";
import Footer from "./footer";
import Offre from "./offre";
import AvisClient from "./avisClient";
import { Link } from "react-router-dom";
export default function Contenu() {
  return (
    <>
      <Nav />
      <section class="slider_section">
        <div class="slider_container">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-7">
                      <div class="detail-box">
                        <h1>
                          Welcome To <br />
                          Pharmacie
                        </h1>
                        <p>
                        À la Pharmacie, nous nous engageons à fournir des soins de santé de qualité et des conseils experts à notre communauté. Notre équipe de professionnels qualifiés est dédiée à votre bien-être et à votre santé. Que vous ayez besoin de médicaments sur ordonnance, de produits de santé et de bien-être, ou de conseils personnalisés, nous sommes là pour vous accompagner à chaque étape. Visitez-nous pour tous vos besoins de santé et découvrez notre service exceptionnel.
                        </p>
                        <a href="/contact">Contact Us</a>
                      </div>
                    </div>
                    <div class="col-md-5 ">
                      <div class="img-box">
                        <img src="images/img1.png" alt="" style={{width:'100%'}}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AvisClient/>
      <Offre />
      <Footer />
    </>
  );
}
