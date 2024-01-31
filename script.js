async function bookTrip(button) {
  const tripId = {
    tripId: button.parentElement.id,
  };
  await fetch('http://localhost:3000/carts/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripId),
  });
  button.style.backgroundColor = '#4da0df';
  button.innerHTML = `<i class="fa-solid fa-check"></i>`;
  console.log('trip added to cart');
}

function listenBookButtons(buttons) {
  for (let button of buttons) {
    button.addEventListener('click', () => {
      bookTrip(button);
    });
  }
}

async function getSingleTrip(trips) {
  for (let trip of trips) {
    // new fetch for every  single trip found
    const singleResult = await fetch(
      `http://localhost:3000/trips/search/${trip._id}`
    );
    const allResultItems = await singleResult.json();
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
          <button class="book-trip">
              Book
          </button>
        </div>
        `;

    document.querySelector('#content-right').innerHTML += singleTrip;
    document.querySelector('#content-right').style.justifyContent =
      'flex-start';
  }
}

async function searchTrip() {
  const departureValue = document.querySelector('#departure').value;
  const arrivalValue = document.querySelector('#arrival').value;
  const dateValue = document.querySelector('#dateSelection').value;

  if (departureValue && arrivalValue && dateValue) {
    const userInfos = {
      departure: departureValue,
      arrival: arrivalValue,
      date: dateValue,
    };

    //console.log(userInfos);

    const AllResults = await fetch('http://localhost:3000/trips/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfos),
    });

    const allResultItems = await AllResults.json();
    if (allResultItems.trips.length === 0) {
      document.querySelector('#img-train').src = 'images/notfound.png';
      document.querySelector('#text-result').textContent = 'No trip found.';
    } else {
      // removing right part content
      document.querySelector('#content-right').innerHTML = '';
      // add all found trip to right part of page
      await getSingleTrip(allResultItems.trips);
      const allBookButtons = document.querySelectorAll('.book-trip');
      listenBookButtons(allBookButtons);
    }
  } else {
    console.log('1 or more missing fields');
  }
}

document.querySelector('#btn-search').addEventListener('click', searchTrip);
