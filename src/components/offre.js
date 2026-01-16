export default function Offre() {
  return (
    <>
      <section className="gift_section layout_padding-bottom">
        <div className="box">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5">
                <div className="img_container">
                  <div className="img-box">
                    <img src="images/gifts.png" alt="Cadeaux" />
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="detail-box">
                  <div className="heading_container">
                    <h2>
                      Des Cadeaux Bonus avec <br />
                      Vos Produits Préférés
                    </h2>
                  </div>
                  <p>
                    Pour chaque achat de certains produits sélectionnés, recevez
                    des <strong>cadeaux bonus</strong> exclusifs ! Profitez de cette opportunité pour choyer vos proches ou vous faire plaisir. Nos cadeaux bonus incluent des articles de bien-être, des échantillons de produits de beauté, et bien plus encore.
                  </p>
                  <div className="btn-box">
                    <a href="/produit" className="btn1">
                      Acheter Maintenant
                    </a>
                    <a href="/contact" className="btn2">
                      Voir Plus
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
