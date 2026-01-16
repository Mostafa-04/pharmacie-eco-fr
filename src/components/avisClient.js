export default function AvisClient() {
  return (
    <>
      <section class="client_section layout_padding">
        <div class="container">
          <div class="heading_container heading_center">
            <h2>Avis Clients</h2>
          </div>
        </div>
        <div class="container px-0">
          <div
            id="customCarousel2"
            class="carousel  carousel-fade"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="box">
                  <div class="client_info">
                    <div class="client_name">
                      <h5>KHALISS Niama</h5>
                      <h6>Service impeccable !</h6>
                    </div>
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                  </div>
                  <p>
                  La navigation sur le site est simple et efficace. J'ai pu trouver facilement les médicaments dont j'avais besoin. La livraison rapide m'a permis de recevoir mes produits le lendemain de ma commande. Merci pour votre professionnalisme !
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <div class="box">
                  <div class="client_info">
                    <div class="client_name">
                      <h5>BOUSSOUNI Abir</h5>
                      <h6>Excellente expérience !</h6>
                    </div>
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                  </div>
                  <p>
                  C'est la première fois que je commande sur ce site et je suis très impressionnée. Les prix sont compétitifs et le choix de produits est vaste. De plus, j'ai apprécié les conseils personnalisés du pharmacien. Je repasserai commande sans hésiter.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <div class="box">
                  <div class="client_info">
                    <div class="client_name">
                      <h5>ERRAMI Fadoua</h5>
                      <h6>Très satisfaite !</h6>
                    </div>
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                  </div>
                  <p>
                  J'ai commandé plusieurs produits sur ce site et la livraison a été très rapide. Les produits sont de qualité et conformes à la description. Le service client est également très réactif et à l'écoute. Je recommande vivement cette pharmacie en ligne !
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel_btn-box">
              <a
                class="carousel-control-prev"
                href="#customCarousel2"
                role="button"
                data-slide="prev"
              >
                <i class="fa fa-angle-left" aria-hidden="true"></i>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#customCarousel2"
                role="button"
                data-slide="next"
              >
                <i class="fa fa-angle-right" aria-hidden="true"></i>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
