/* to remove */

function getBookings() {
  fetch("http://localhost:3000/carts/getBooking")
    .then((response) => response.json())
    .then((data) => {
      // faire quelque chose de "data", qui contient la réponse de la requête
      console.log("Bookings: ", data);
    });
}

// retirer le commentaire de la ligne ci-dessous pour appeler la fonction
//getBookings();

function getCart() {
  fetch("http://localhost:3000/carts/getCart")
    .then((response) => response.json())
    .then((data) => {
      // faire quelque chose de "data", qui contient la réponse de la requête
      console.log("Carts: ", data.userCarts);
      // boucle sur chaque élément de data pour sortir les infos de chaque voyage
      for (let userCart of data.userCarts) {
        // nouveau fetch avec data.userCarts.tripId pour récupérer les informations du voyage
        fetch(`http://localhost:3000/trips/search/${userCart.tripId}`)
          .then((response) => response.json())
          .then((trip) => {
            // informations individuelles de chaque voyage contenues dans "trip"
            // intégrer ces éléments au front, en faisant des document.querySelector('.truc').textContent = trip.trip.arrival; par exemple
            console.log("Single trip: ", trip);
          });
      }
    });
}

// retirer le commentaire de la ligne ci-dessous pour appeler la fonction
getCart();

// fonction a appeler pour faire la requête quand un user sélectionne un voyage et traiter la réponse de cette requête
function addNewCart(newCart) {
  fetch("http://localhost:3000/carts/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCart),
  })
    .then((response) => response.json())
    .then((data) => {
      // à mon avis, il n'y a rien besoin de faire ici, on ajoute simplement quelque chose à la db

      console.log("New cart was correctly added");
    });
}

// simulation d'un voyage choisi par l'utilisateur
const cartToAdd = {
  // exemple ! en vrai le tripId soit être celui du voyage ajouté et le userId de la personne qui l'ajoute. userId est facultatif
  // userId n'est pas nécessaire et a une valeur par défaut
  // tripId doit correspondre à celui sur lequel l'user a cliqué
  userId: "65b8f89debf5988b2efd772b",
  tripId: "65b91038af1f5af5ce0bbb04",
};

//appel de la function addNewCart lorsqu'un user sélectionne un voyage. L'argument "cartToAdd" ici doit être remplacé avec le voyage que l'user a choisi
// retirer le commentaire de la ligne ci-dessous pour appeler la fonction
//addNewCart(cartToAdd);

/* / to remove */
