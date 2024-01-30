/* scripts for booking.html pages */

// we can specify an userId to search for specific user carts, otherwise it defaults to "bob"
const newBooking = {
  userId: '65b8e837956a71c9cfa6d882',
};

// var to store total cost of all trip, to be displayed after loop
//let totalTripCost = [];

function getBooking() {
  fetch('http://localhost:3000/carts/getBooking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBooking),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        document.querySelector(
          '.cart'
        ).innerHTML = `<h3 class="single-trip-title"> My bookings </h3>`;

        // loop on every element of data to get single trip details
        for (let userBooking of data.userBookings) {
          // new fetch for every  single trip found
          fetch(`http://localhost:3000/trips/search/${userBooking.tripId}`)
            .then((response) => response.json())
            .then((trip) => {
              let singleTrip = `
                <div class="single-trip" id="${trip.trip._id}">
                  <div class="travel-trip">
                      ${trip.trip.departure} > ${trip.trip.arrival}
                  </div>
                  <div class="hour-trip">
                      ${trip.trip.date}
                  </div>
                  <div class="price-trip">
                      ${trip.trip.price}€
                  </div>
                  <div class="countdown-trip">
                      TODO
                  </div>
                </div>
                `;

              document.querySelector('.cart').innerHTML += singleTrip;
            });
        }

        let footerBooking = `
                      <div class="footer-booking">
                      <hr>
                      <p> Enjoy your travels with Tickethack! </p>
                      </div>
                  `;
        document.querySelector('.cart-container').innerHTML += footerBooking;
      } else {
        console.log('no trip found');
      }
    });
}

// initial call to fetch carts, if any
getBooking();
