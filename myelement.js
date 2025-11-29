//  --------------------------------------------------
//        1) Web Component: donation-progress
//     -------------------------------------------------- */


   class DonationProgress extends HTMLElement {

      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.amount = 0; // Donaciones actuales
      }

      connectedCallback() {
        this.render();
      }

      static get observedAttributes() {
        return ["goal"];
      }

      attributeChangedCallback() {
        this.render();
      }

      setDonation(amount) {
        this.amount = amount;
        this.updateBar();
      }

      updateBar() {
        const goal = Number(this.getAttribute("goal"));
        const percent = Math.min((this.amount / goal) * 100, 100);

        this.shadowRoot.querySelector(".bar").style.width = percent + "%";
        this.shadowRoot.querySelector(".label").textContent =
          ` Meta $${goal} (${percent.toFixed(1)}%)`;
      }

      render() {
        const goal = this.getAttribute("goal");

        this.shadowRoot.innerHTML = `
          <style>
            .container {
              width: 100%;
              background:#e2e2e2;
              border-radius: 20px;
              overflow: hidden;
              height: 18px;
              box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
            }
            .bar {
              height: 100%;
              width: 0%;
              background: linear-gradient(90deg,#4CAF50,#0d8a36);
              transition: width .40s ease;
            }
            .label {
              margin-top: 10px;
              font-size: 1.1rem;
              font-weight: bold;
              text-align: center;
            }
            .titulo_donaciones {
              font-size: 1.2rem;
              text-align: center;
              margin-bottom: 8px;
              font-weight: bold;
            }
          </style>

            <h3 class="titulo_donaciones">Progreso de Donaciones</h3>
          <div class="container">
            
            <div class="bar"></div>
          </div>
          <div class="label">$0 / $${goal} (0%)</div>
        `;
      }
    }

    customElements.define("donation-progress", DonationProgress);


    /* --------------------------------------------------
       2) Firebase Realtime Database
    -------------------------------------------------- */


    // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration

  const firebaseConfig = {
    apiKey: "AIzaSyD0A3EzWNzUIFQpMAeraynscioaoAAF6ds",
    authDomain: "donaciones-web-b7bb9.firebaseapp.com",
    projectId: "donaciones-web-b7bb9",
    storageBucket: "donaciones-web-b7bb9.firebasestorage.app",
    messagingSenderId: "780442395116",
    appId: "1:780442395116:web:c64be438900e41f11b20c9"
  };


  // Initialize Firebase

     const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);


    /* --------------------------------------------------
       3) Conectar la base de datos con el componente
    -------------------------------------------------- */

    const progress = document.querySelector("donation-progress");

    // Escuchar en tiempo real los valores
    onValue(ref(db, "donations"), snap => {
      const data = snap.val();

      if (data && data.total !== undefined) {
        progress.setDonation(Number(data.total));
      }
    });
