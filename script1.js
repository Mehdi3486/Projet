document.addEventListener("DOMContentLoaded", () => {
    afficherReservations(); // Affichage dès le chargement
    // Affiche les réservations
    function afficherReservations() {
        const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        //const detailsContainer = document.getElementById("details");
        const compteur = document.getElementById("compteur");
        compteur.textContent = ` ${reservations.length}`;
    }   
    // Témoignages dynamiques
    let testimonials = [
        { text: "Super service ! Voitures en excellent état et réservation facile.", author: "Ali" },
        { text: "Prix compétitifs et service client au top, je recommande.", author: "Mohammed" },
        { text: "Rapide, efficace et sans surprise, parfait !", author: "Omar" }
    ];

    let testimonialIndex = 0;
    function updateTestimonial() {
        let testimonial = document.querySelector(".testimonial p");
        let author = document.querySelector(".testimonial h4");

        if (testimonial && author) {
            testimonial.textContent = `"${testimonials[testimonialIndex].text}"`;
            author.textContent = `- ${testimonials[testimonialIndex].author}`;
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        }
    }
    setInterval(updateTestimonial, 5000);
});