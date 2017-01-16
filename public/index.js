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

//Exercice 1 create function to generate the price for each driver:

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

function setPrice(rentalId){
  var rental = getRental(rentalId);
  var car = getCar(rental.carId);
  var pricePerDay = car.pricePerDay;
  var pricePerKm = car.pricePerKm;
  var pickupDate = new Date(rental.pickupDate);
  var returnDate = new Date(rental.returnDate);
  var nbDays = 1 + ((returnDate - pickupDate)/(1000*3600*24));
  var priceForDistance = (rental.distance)*pricePerKm;
  var priceForDuration = 0;
  var dayCount = 1;
  while(dayCount <= nbDays){
    if(dayCount == 1)
      priceForDuration += pricePerDay;
    else if(dayCount <= 4)
      priceForDuration += pricePerDay - (pricePerDay*10/100);
    else if(dayCount <= 10)
      priceForDuration += pricePerDay - (pricePerDay*30/100);
    else
      priceForDuration += pricePerDay - (pricePerDay*50/100);
    dayCount++;
  }
  rental.price = priceForDuration + priceForDistance;
  var commission = rental.price*30/100;
  rental.commission['insurance'] = commission/2;
  rental.commission['assistance'] = nbDays;
  rental.commission['drivy'] = commission - (commission/2 + nbDays);
}

setPrice('1-pb-92');
setPrice('2-rs-92');
setPrice('3-sa-92');

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
