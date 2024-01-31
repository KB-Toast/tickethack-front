async function getSingleTrip(trips) {
  for (let trip of trips) {
    // new fetch for every  single trip found
    console.log(trip);
    const singleResult = await fetch(
      `http://localhost:3000/trips/search/${trip._id}`
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
          <button class="remove-trip">
              X
          </button>
        </div>
        `;

    document.querySelector('#content-right').innerHTML += singleTrip;
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
    console.log(allResultItems);
    if (allResultItems.trips.length === 0) {
      document.querySelector('#img-train').src = 'images/notfound.png';
      document.querySelector('#text-result').textContent = 'No trip found.';
    } else {
      // removing right part content
      document.querySelector('#content-right').innerHTML = '';
      // add all found trip to right part of page
      const singleTrip = await getSingleTrip(allResultItems.trips);
    }
  } else {
    console.log('1 or more missing fields');
  }
}

document.querySelector('#btn-search').addEventListener('click', searchTrip);
