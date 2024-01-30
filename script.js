function searchTrip() {
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

    fetch('http://localhost:3000/trips/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfos),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.trips.length === 0) {
          document.querySelector('#img-train').src = 'images/notfound.png';
          document.querySelector('#text-result').textContent = 'No trip found.';
        } else {
          // add all found trip to right part of page
        }
      });
  } else {
    console.log('1 or more missing fields');
  }
}

document.querySelector('#btn-search').addEventListener('click', searchTrip);
