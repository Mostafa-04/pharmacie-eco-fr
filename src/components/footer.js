export default function Footer(){
    return (
      <>
        <section class="info_section  layout_padding2-top">
          <div class="social_container">
            <div class="social_box">
              <a href="#">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div class="info_container ">
            <div class="container">
              <div class="row">
                <div class="col-md-6 col-lg-6">
                  <h6>ABOUT US</h6>
                  <p>
                    Nous sommes une agence de pharmacie dédiée à fournir des services de santé de qualité supérieure. Notre équipe d'experts pharmaciens s'engage à offrir des conseils personnalisés et des soins adaptés à chaque patient. Nous proposons une large gamme de produits pharmaceutiques pour répondre à tous vos besoins de santé.
                  </p>
                </div>
                <div class="col-md-6 col-lg-3">
                  <h6>BESION D'AIDE</h6>
                  <p>
                  Pour toute question ou conseil concernant votre traitement médicamenteux, notre équipe de pharmaciens est à votre disposition pour vous aider et vous guider. N'hésitez pas à nous contacter pour obtenir des informations personnalisées et des solutions adaptées à vos besoins.
                  </p>
                </div>
                <div class="col-md-6 col-lg-3">
                  <h6>CONTACT US</h6>
                  <div class="info_link-box">
                    <a href="#">
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                      <span> Casablanca </span>
                    </a>
                    <a href="#">
                      <i class="fa fa-phone" aria-hidden="true"></i>
                      <span>+212 617125803</span>
                    </a>
                    <a href="#">
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                      <span>Pharmacie@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class=" footer_section">
            <div class="container">
              <p>
                &copy; <span id="displayYear"></span> All Rights Reserved By
                <a href="#"> </a>
              </p>
            </div>
          </footer>
        </section>
      </>
    );
}