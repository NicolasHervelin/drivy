'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];


function getCar(carId){
  var carsLength = cars.length;
  for(var i = 0; i < carsLength; i++){
    if(cars[i]['id'] == carId){
      return cars[i];
    }
  }
}

function getRental(rentalId){
  var rentalsLength = rentals.length;
  for(var i = 0; i < rentalsLength; i++){
    if(rentals[i]['id'] == rentalId){
      return rentals[i];
    }
  }
}

function getActors(rentalId){
  var actorsLength = actors.length;
  for(var i = 0; i < actorsLength; i++){
    if(actors[i]['rentalId'] == rentalId){
      return actors[i];
    }
  }
}

function setPrice(rentalId){
  var rental = getRental(rentalId); //Get the object "rental" which match with the rental id
  var car = getCar(rental.carId); //Get the object "car" which match with the car id
  var pricePerDay = car.pricePerDay;
  var pricePerKm = car.pricePerKm;
  var pickupDate = new Date(rental.pickupDate);
  var returnDate = new Date(rental.returnDate);
  var nbDays = 1 + ((returnDate - pickupDate)/(1000*3600*24)); //Duration of the rental (in days)
  var priceForDistance = (rental.distance)*pricePerKm;
  var priceForDuration = 0;
  var dayCount = 1;
  var deductibleToPay = 0; //Nothing to pay for the driver who not subscribed
  if(rental.deductibleReduction == true)
    deductibleToPay = 4*nbDays; //4€ per day to pay for the driver who subscribed

  while(dayCount <= nbDays){
    if(dayCount == 1)
      priceForDuration += pricePerDay; //No reduction for one day rental
    else if(dayCount <= 4)
      priceForDuration += pricePerDay - (pricePerDay*10/100); //10% reduction on price per day after one day rental
    else if(dayCount <= 10)
      priceForDuration += pricePerDay - (pricePerDay*30/100); //30% reduction on price per day after the fourth day of rental
    else
      priceForDuration += pricePerDay - (pricePerDay*50/100); //50% reduction on price per day after the tenth day of rental
    dayCount++;
  }

  rental.price = priceForDistance + priceForDuration + deductibleToPay;
  //commission distribution:
  var priceWithoutDeductible = priceForDuration + priceForDistance;
  var commission = priceWithoutDeductible*30/100;
  rental.commission['insurance'] = commission/2;
  rental.commission['assistance'] = nbDays;
  rental.commission['drivy'] = commission - (commission/2 + nbDays) + deductibleToPay;

  //pay the actors:
  var actors = getActors(rentalId);

  actors.payment[0].amount = rental.price; //Charge for the driver

  //Amount received by the owner
  if(rental.deductibleReduction == true)
    actors.payment[1].amount = priceWithoutDeductible - commission;
  else
    actors.payment[1].amount = rental.price - commission;

  //Amount received by the insurance
  actors.payment[2].amount = rental.commission['insurance'];

  //Amount received by the assistance
  actors.payment[3].amount = rental.commission['assistance'];

  //Amount received by drivy
  actors.payment[4].amount = rental.commission['drivy'];
}

setPrice('1-pb-92');
setPrice('2-rs-92');
setPrice('3-sa-92');

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
