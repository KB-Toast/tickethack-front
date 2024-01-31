/* scripts for booking.html pages */

// we can specify an userId to search for specific user carts, otherwise it defaults to "bob"
const newBooking = {
  userId: '65b8e837956a71c9cfa6d882',
};

async function getSingleBookings(userBookings) {
  // var to store total cost of all trip, to be displayed after loop
  let tripCost = 0;
  // loop on every element of data to get single trip details
  for (let userBooking of userBookings) {
    // new fetch for every  single trip found
    const singleResult = await fetch(
      `http://localhost:3000/trips/search/${userBooking.tripId}`
    );
    const allResultItems = await singleResult.json();
    let singleTrip = `
        <div class="single-trip" id="${allResultItems.trip._id}">
          <div class="travel-trip">
              ${allResultItems.trip.departure} > ${allResultItems.trip.arrival}
          </div>
          <div class="hour-trip">
              ${allResultItems.trip.date}
          </div>
          <div class="price-trip">
              ${allResultItems.trip.price}€
          </div>
          <div class="countdown-trip">
              TODO
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
