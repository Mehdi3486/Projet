document.addEventListener("DOMContentLoaded", () => {
    const demain = new Date();
    demain.setDate(demain.getDate() + 2);
    const demainStr = demain.toISOString().split("T")[0];

    document.querySelectorAll(".date-debut, .date-fin").forEach(input => {
        input.setAttribute("min", demainStr);
    });
    const tarifs = {
        "RENAULT CLIO": 200,
        "RENAULT MEGANE": 50,
        "TOYOTA YARIS": 200,
        "OPEL ASTRA": 400,
        "BMW G30": 1500,
        "BMW G11" : 2000,
        "PEUGEOT 208": 200,
        "RENAULT EXPRESSE" : 350,
        "DACIA DOCKER" : 300,
        "FORD KUGA" : 600,
        "DACIA DUSTER" : 500,
        "DACIA STEPWAY":200
    };

    // Fonction de calcul de prix
    function calculerPrix(dateDebut, dateFin, modele) {
        const debut = new Date(dateDebut);
        const fin = new Date(dateFin);
        const duree = Math.ceil((fin - debut) / (1000 * 60 * 60 * 24)); // jours
        const prixJour = tarifs[modele.toUpperCase()] || 50; // par défaut
        return duree * prixJour;
    }


afficherReservations(); // Affichage dès le chargement
// Affiche les réservations
function afficherReservations() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const detailsContainer = document.getElementById("details");
    const compteur = document.getElementById("compteur");

    if (reservations.length === 0) {
        if (compteur) compteur.textContent = "0";
        if (detailsContainer) {
            detailsContainer.innerHTML = "<p class=hip >Aucune réservation trouvée.</p>";
        }
        return;
    }

    let total = 0;
    if (compteur) compteur.textContent = ` ${reservations.length}`;
    if (detailsContainer) detailsContainer.innerHTML = "";

    reservations.forEach((reservation, index) => {
        const prix = calculerPrix(reservation.dateDebut, reservation.dateFin, reservation.nom);
        total += prix;

        const voitureCard = document.createElement("div");
        voitureCard.classList.add("card");
        voitureCard.innerHTML = `
            <img src="images/${reservation.nom.toUpperCase()}.png" alt="${reservation.nom}">
            <h3>${reservation.nom}</h3>
            <p><strong>Du:</strong> ${reservation.dateDebut} <br> <strong>Au:</strong> ${reservation.dateFin}</p>
            <p><strong>Prix :</strong> ${prix} DH</p>
            <button onclick="annulerReservation(${index})">Annuler</button>
        `;
        detailsContainer.appendChild(voitureCard);
    });

    const totalElement = document.createElement("div");
    totalElement.classList.add("total");
    totalElement.innerHTML = `<h3 class=hip >Total général : ${total} DH</h3>`;
    detailsContainer.appendChild(totalElement);
}
 // Annuler une réservation
 window.annulerReservation = function(index) {
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    afficherReservations();
};

 // Pop-up de finalisation
 const boutonFinaliser = document.getElementById("finaliser");
 const popup = document.getElementById("popup");
 const boutonConfirmer = document.getElementById("confirmer");
 const boutonAnnuler = document.getElementById("annuler");

 if (boutonFinaliser) {
     boutonFinaliser.addEventListener("click", () => {
         popup.style.display = "block";
     });
 }

 if (boutonAnnuler) {
     boutonAnnuler.addEventListener("click", () => {
         popup.style.display = "none";
     });
 }

 if (boutonConfirmer) {
     boutonConfirmer.addEventListener("click", () => {
         const nom = document.getElementById("nom").value.trim();
         const prenom = document.getElementById("prenom").value.trim();
         const telephone = document.getElementById("telephone").value.trim();
         const email = document.getElementById("email").value.trim();
         const adresse = document.getElementById("adresse").value.trim();

             if (!nom || !prenom || !telephone || !email || !adresse) {
                alert("Tous les champs sont obligatoires.");
                return;
            }
            
            // Vérifie le nom et le prénom (lettres uniquement)
            const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ\-'\s]+$/;
            if (!regexNom.test(nom) || !regexNom.test(prenom)) {
                alert("Le nom et le prénom ne doivent contenir que des lettres.");
                return;
            }
            
            // Vérifie le téléphone (format français ou international simple)
            const regexTel = /^(\+?\d{1,3})?0?\d{9}$/;
            if (!regexTel.test(telephone)) {
                alert("Le numéro de téléphone est invalide.");
                return;
            }
            
            // Vérifie l’email (format standard)
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                alert("L'adresse e-mail est invalide.");
                return;
            }

         const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
         const reservationsConfirmees = JSON.parse(localStorage.getItem("reservationsConfirmees")) || {};

         reservations.forEach(res => {
             if (!reservationsConfirmees[res.nom]) {
                 reservationsConfirmees[res.nom] = [];
             }
             reservationsConfirmees[res.nom].push({ dateDebut: res.dateDebut, dateFin: res.dateFin });
         });

         localStorage.setItem("reservationsConfirmees", JSON.stringify(reservationsConfirmees));
         alert("Réservation effectuée avec succès !");
         localStorage.removeItem("reservations");
         popup.style.display = "none";
         afficherReservations();
     });
 }
});