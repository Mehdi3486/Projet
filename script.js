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
    
        if (document.querySelector(".btn-reserver")) {
            const boutonsReserver = document.querySelectorAll(".btn-reserver");
        
            boutonsReserver.forEach(bouton => {
                bouton.addEventListener("click", () => {
                    const voitureDiv = bouton.closest("div");
                    const nomVoiture = voitureDiv.getAttribute("data-nom");
                    const dateDebut = voitureDiv.querySelector(".date-debut").value;
                    const dateFin = voitureDiv.querySelector(".date-fin").value;
        
                    if (!dateDebut || !dateFin) {
                        alert("Veuillez sélectionner une date de début et de fin.");
                        return;
                    }
        
                    if (new Date(dateDebut) >= new Date(dateFin)) {
                        alert("La date de début doit être antérieure à la date de fin.");
                        return;
                    }
        
                    // On récupère toutes les réservations (confirmées et en cours)
                    const reservationsConfirmees = JSON.parse(localStorage.getItem("reservationsConfirmees")) || {};
                    const reservationsEnCours = JSON.parse(localStorage.getItem("reservations")) || [];
        
                    // Regroupe toutes les réservations pour cette voiture
                    const dejaReservees = [
                        ...(reservationsConfirmees[nomVoiture] || []),
                        ...reservationsEnCours.filter(r => r.nom === nomVoiture)
                    ];
        
                    // Vérifie chevauchement
                    const chevauche = dejaReservees.some(r =>
                        datesChevauchent(dateDebut, dateFin, r.dateDebut, r.dateFin)
                    );
        
                    if (chevauche) {
                        alert("Cette voiture est déjà réservée (en cours ou confirmée) pour cette période. Veuillez choisir d'autres dates.");
                        return;
                    }
        
                    // Ajoute la nouvelle réservation en cours
                    let reservations = reservationsEnCours;
                    reservations.push({ nom: nomVoiture, dateDebut, dateFin });
        
                    localStorage.setItem("reservations", JSON.stringify(reservations));
                    window.location.href = "reservation.html";
                });
            });
        }
        


    // Affiche les dates déjà réservées
    if (document.querySelector(".btn-reserver")) {
        const reservationsConfirmees = JSON.parse(localStorage.getItem("reservationsConfirmees")) || {};

        document.querySelectorAll("div[data-nom]").forEach(div => {
            const nomVoiture = div.getAttribute("data-nom");
            const dates = reservationsConfirmees[nomVoiture] || [];
                if (dates.length > 0) {
                    const ul = document.createElement("ul");
                    ul.classList.add("scrollable-dates"); // 👈 ajoute cette ligne
                    dates.forEach(d => {
                        const li = document.createElement("li");
                        li.textContent = `${d.dateDebut} → ${d.dateFin}`;
                        ul.appendChild(li);
                    });
                    div.appendChild(ul);
                }
        });
    }

    // Menu animation au scroll
    window.addEventListener("scroll", function () {
        let header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    function afficherReservations() {
        const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        const compteur = document.getElementById("compteur");
        compteur.textContent = ` ${reservations.length}`;
    }  
    afficherReservations() 

// Fonction pour vérifier le chevauchement
function datesChevauchent(debut1, fin1, debut2, fin2) {
    return (new Date(debut1) <= new Date(fin2)) && (new Date(fin1) >= new Date(debut2));
}
});


