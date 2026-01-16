import axios from "axios";
import Nav from "./nav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./footer";
import Swal from "sweetalert2";
export default function Contact() {
  const [NewContact, setNewContact] = useState({
    nomContact: "",
    numTel: "",
    email: "",
    choix: "",
    message: "",
  });

  const Navigate = useNavigate();

  const getValue = (event) => {
    setNewContact((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const AjouterC = () => {
    axios.post("http://127.0.0.1:8000/api/contact", NewContact).then((res) => {
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Votre Demande a été Bien Envoyé",
          showConfirmButton: false,
          timer: 3000
        });
        setNewContact(
          {
            nomContact: "",
            numTel: "",
            email: "",
            choix: "",
            message: "",
          }
        )
      }
    });
  };

  return (
    <>
    <Nav/>
      <section class="contact_section">
        <div class="container pt-5">
          <div class="heading_container">
            <h2 class="">Contactez-nous</h2>
          </div>
        </div>
        <div class="container container-bg">
          <div class="row">
            <div class="col-lg-7 col-md-6 px-0">
              <div class="map_container">
                <div class="map-responsive">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212753.67439902035!2d-7.7518051687337834!3d33.57217828345677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sfr!2sma!4v1716725349038!5m2!1sfr!2sma" width="600"
                    height="500"
                    style={{margin:'35px' , marginTop:'45px'}}
                    frameborder="0"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-5 px-0">
              <form action="#">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    name="nomContact"
                    onChange={getValue}
                    value={NewContact.nomContact}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={getValue}
                    value={NewContact.email}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Phone"
                    name="numTel"
                    onChange={getValue}
                    value={NewContact.numTel}
                  />
                </div>
                <div>
                  <select name="choix" onChange={getValue} value={NewContact.choix}>
                    <option value="">choix...</option>
                    <option value="sirop">Sirop</option>
                    <option value="pommades">Pommades</option>
                    <option value="comprimé">Comprimé</option>
                    <option value="huile">Huile</option>
                  </select>
                </div><br/>
                <div>
                  <input
                    type="text"
                    class="message-box"
                    placeholder="Message"
                    name="message"
                    onChange={getValue}
                    value={NewContact.message}
                  />
                </div>
                <div class="d-flex ">
                  <button type="button" onClick={AjouterC}>Envoyer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
