const initialDate = Date.now();
const departureDate = new Date('2024-02-01').getTime();

// calcul entre la date de demain et aujourd'hui

console.log('initialDate: ', initialDate);
console.log('departureDate: ', departureDate);

const timeBetweenDates = departureDate - initialDate;
// trouver comment faire en sorte que "timeBetweenDates" soit sous la forme "X jours et Y minutes"
let a = timeBetweenDates / 3600000;
console.log('a: ', a);

console.log('timeBetweenDates: ', timeBetweenDates);
