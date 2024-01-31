/* scripts for cart.html pages */

function removeTripFromDB(tripId) {
  const tripToRemove = {
    tripId,
  };
  fetch('http://localhost:3000/carts/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripToRemove),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('trip removed');
    });
}

function removeTrip(button, tripCost) {
  // getting tripId to remove from db
  const tripId = button.parentElement.id;
  // getting new total cost
  let stringCost = button.parentElement.querySelector('.price-trip').innerText;
  let numCost = parseInt(stringCost.slice(0, stringCost.length - 1));
  tripCost -= numCost;
  // update Total with new cost
  document.querySelector('.total-cart').innerHTML = `Total: ${tripCost} €`;

  // removing trip from cart UI
  button.parentElement.remove();

  // adding new eventListeners because new dom (?)
  const allRemoveButtons = document.querySelectorAll('.remove-trip');
  listenRemoveButtons(allRemoveButtons, tripCost);

  // delete by id from cart
  removeTripFromDB(tripId);
}

function listenRemoveButtons(buttons, oldTripCost) {
  for (let button of buttons) {
    button.addEventListener('click', () => {
      removeTrip(button, oldTripCost);
    });
  }
}

async function payCart() {
  const tripsToPay = document.querySelectorAll('.single-trip');
  for (let tripToPay of tripsToPay) {
    let tripInfos = {
      tripId: tripToPay.id,
    };

    await fetch('http://localhost:3000/carts/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripInfos),
    });
  }
  window.location.href = 'booking.html';
}

function updateFooterCart(tripCost) {
  let footerCart = `
                    <div class="footer-cart">
                        <div class="total-cart">
                            Total: ${tripCost}€
                        </div>
                        <div class="button-cart">
                            <button id="purchaseCart"> Purchase </button>
                        </div>
                    </div>
                `;
  document.querySelector('.cart-container').innerHTML += footerCart;
  document.querySelector('#purchaseCart').addEventListener('click', payCart);
}

async function getSingleCarts(userCarts) {
  // var to store total cost of all trip, to be displayed after loop
  let tripCost = 0;
  // loop on every element of data to get single trip details
  for (let userCart of userCarts) {
    // new fetch for every  single trip found
    const singleResult = await fetch(
      `http://localhost:3000/trips/search/${userCart.tripId}`
    );
    const allResultItems = await singleResult.json();

    // formating date for display
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
    // keeping track of total cost
    tripCost += allResultItems.trip.price;
    let singleTrip = `
        <div class="single-trip" id="${allResultItems.trip._id}">
          <div class="travel-trip">
              ${allResultItems.trip.departure} > ${allResultItems.trip.arrival}
          </div>
          <div class="hour-trip">
          ${hoursTrip}:${minsTrip}
          </div>
          <div class="price-trip">
              ${allResultItems.trip.price}€
          </div>
          <button class="remove-trip">
              X
          </button>
        </div>
        `;

    document.querySelector('.cart').innerHTML += singleTrip;
  }
  return tripCost;
}

async function getCart() {
  const getAllCartItems = await fetch('http://localhost:3000/carts/getCart');

  const allCartItems = await getAllCartItems.json();

  if (allCartItems.userCarts.length !== 0) {
    document.querySelector(
      '.cart'
    ).innerHTML = `<h3 class="single-trip-title"> My cart </h3>`;

    const totalTripCost = await getSingleCarts(allCartItems.userCarts);

    updateFooterCart(totalTripCost);
    const allRemoveButtons = document.querySelectorAll('.remove-trip');
    listenRemoveButtons(allRemoveButtons, totalTripCost);
  } else {
    console.log('Nothing in cart');
  }
}

// initial call to fetch carts, if any
getCart();
