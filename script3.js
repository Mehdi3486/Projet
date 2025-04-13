document.addEventListener("DOMContentLoaded", () => {
    afficherReservations(); // Affichage dès le chargement
    // Affiche les réservations
    function afficherReservations() {
        const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        //const detailsContainer = document.getElementById("details");
        const compteur = document.getElementById("compteur");
        compteur.textContent = ` ${reservations.length}`;
    }   
});