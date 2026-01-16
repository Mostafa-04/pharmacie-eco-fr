import AvisClient from "./avisClient";
import Footer from "./footer";
import Nav from "./nav";
export default function Apropos(){
    return (
      <>
      <Nav/>        
        <section class="why_section layout_padding">
          <div class="container">
            <div class="heading_container heading_center">
              <h2>POURQUOI FAIRE VOS ACHATS AVEC NOUS ?</h2>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="box">
                  <div class="img-box"></div>
                  <div class="detail-box">
                    <h5>Livraison Rapide</h5>
                    <p>Notre service de livraison rapide vous garantit la réception rapide de vos produits médicaux, où que vous soyez. Nous nous engageons à vous offrir une expérience fluide et efficace, avec des délais de livraison rapides pour répondre à vos besoins urgents en matière de santé.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="box ">
                  <div class="img-box"></div>
                  <div class="detail-box">
                    <h5>Livraison Gratuite</h5>
                    <p>Profitez de notre offre de livraison gratuite pour recevoir vos produits médicaux essentiels sans frais supplémentaires. Simplifiez votre expérience d'achat en ligne tout en économisant sur les frais de livraison.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="box ">
                  <div class="img-box"></div>
                  <div class="detail-box">
                    <h5>Qualité Supérieure</h5>
                    <p>Notre engagement envers la qualité supérieure vous assure des produits médicaux sûrs et efficaces, répondant aux normes les plus strictes de l'industrie. Faites confiance à notre sélection soigneusement choisie pour votre santé et votre bien-être optimal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="saving_section ">
          <div class="box">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-6">
                  <div class="img-box">
                    <img src="images/saving-img.png" alt="" />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="detail-box">
                    <div class="heading_container">
                      <h2>
                      Offres Exceptionnelles sur <br />
                      les Nouveaux Médicaments
                      </h2>
                    </div>
                    <p>
                    Découvrez nos nouvelles gammes de médicaments avec des remises incroyables. Profitez d'un large choix de produits pour tous vos besoins de santé et bien-être.
                    </p>
                    <div class="btn-box">
                      <a href="/produit" class="btn1">
                        Acheter des Produits
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AvisClient/>
        <Footer/>
      </>
    );
}