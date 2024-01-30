/* scripts for cart.html pages */

// we can specify an userId to search for specific user carts, otherwise it defaults to "bob"
const newCart = {
  userId: '',
};

function removeTrip() {
  this.parentElement.remove();
  console.log(this);
}

function listenRemoveButtons(buttons) {
  for (let button of buttons) {
    button.addEventListener('click', removeTrip);
  }
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
    console.log('result: ', allResultItems.trip);
    tripCost += allResultItems.trip.price;
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
  const getAllCartItems = await fetch('http://localhost:3000/carts/getCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCart),
  });

  const allCartItems = await getAllCartItems.json();
  //console.log(allCartItems);

  if (allCartItems.userCarts) {
    document.querySelector(
      '.cart'
    ).innerHTML = `<h3 class="single-trip-title"> My cart </h3>`;

    const totalTripCost = await getSingleCarts(allCartItems.userCarts);
    console.log('total: ', totalTripCost);

    updateFooterCart(totalTripCost);
    const allRemoveButtons = document.querySelectorAll('.remove-trip');
    listenRemoveButtons(allRemoveButtons);
  } else {
    console.log('smth went wrong');
  }

  /*
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        document.querySelector(
          '.cart'
        ).innerHTML = `<h3 class="single-trip-title"> My cart </h3>`;

        // loop on every element of data to get single trip details
        for (let userCart of data.userCarts) {
          // new fetch for every  single trip found
          fetch(`http://localhost:3000/trips/search/${userCart.tripId}`)
            .then((response) => response.json())
            .then((trip) => {
              console.log(trip);
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
                <button class="remove-trip">
                    X
                </button>
              </div>
              `;

              document.querySelector('.cart').innerHTML += singleTrip;

              //console.log('Single trip: ', trip);
            });
        }

        let footerCart = `
                    <div class="footer-cart">
                        <div class="total-cart">
                            Total: TODO€
                        </div>
                        <div class="button-cart">
                            <button id="purchaseCart"> Purchase </button>
                        </div>
                    </div>
                `;
        document.querySelector('.cart-container').innerHTML += footerCart;
      } else {
        console.log('no trip found');
      }
    });
  // NOT WORKING, HELP RAIDA PLL :'(
  console.log(document.querySelectorAll('.single-trip'));
  */
}

// initial call to fetch carts, if any
getCart();
