/* scripts for booking.html pages */

async function getSingleBookings(userBookings) {
  // loop on every element of data to get single trip details
  for (let userBooking of userBookings) {
    // new fetch for every  single trip found
    const singleResult = await fetch(
      `http://localhost:3000/trips/search/${userBooking.tripId}`
    );
    const allResultItems = await singleResult.json();

    // formating Date
    const initialDate = new Date();
    const departureDate = new Date(allResultItems.trip.date).getTime();
    const timeBetweenDates = departureDate - initialDate;

    // Calcul nombre de jours avec le nb de millisecondes dans une journée
    const days = Math.floor(timeBetweenDates / 86400000);

    // Calcul reste en millisecondes entre les deux dates
    const restMillisec = timeBetweenDates % 86400000;

    // Calcul nombre d'heures entre les deux dates (3600000ms dans 1h)
    const hours = Math.floor(restMillisec / 3600000);

    // Calcul reste en millisecondes des heures
    const millisecHours = restMillisec % 3600000;

    // Calcul nombre de minutes entre les deux dates (60000ms dans 1 minute)
    const mins = Math.floor(millisecHours / 60000);

    // Résultat en additionnant tout
    let resultatDate = '';
    console.log(hours / 60);
    console.log(days);
    if (days > 0) {
      resultatDate = `Departure in ${days} days and ${hours} hours`;
    } else {
      resultatDate = `Departure in ${hours} hours and ${mins}mins`;
    }

    const parsedStringDate = Date.parse(allResultItems.trip.date);
    const stringToDate = new Date(parsedStringDate);
    let hoursTrip = stringToDate.getHours();
    if (hoursTrip < 10) {
      hoursTrip = '0' + hoursTrip;
    }
    let minsTrip = stringToDate.getMinutes();
    if (minsTrip < 10) {
      minsTrip = '0' + minsTrip;
    }

    let singleTrip = `
        <div class="single-trip-booking" id="${allResultItems.trip._id}">
          <div class="travel-trip">
              ${allResultItems.trip.departure} > ${allResultItems.trip.arrival}
          </div>
          <div class="hour-trip">
              ${hoursTrip}:${minsTrip}
          </div>
          <div class="price-trip">
              ${allResultItems.trip.price}€
          </div>
          <div class="countdown-trip">
              ${resultatDate}
          </div>
        </div>
        `;

    document.querySelector('.cart').innerHTML += singleTrip;
  }
}

async function getBooking() {
  const getAllBookingItems = await fetch(
    'http://localhost:3000/carts/getBooking'
  );

  const allBookingItems = await getAllBookingItems.json();

  if (allBookingItems.userBookings.length !== 0) {
    document.querySelector(
      '.cart'
    ).innerHTML = `<h3 class="single-trip-title"> My bookings </h3>`;

    getSingleBookings(allBookingItems.userBookings);

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
}

// initial call to fetch carts, if any
getBooking();
