//$(document).ready(function () {

// apikey AIzaSyDS40PLoeiiJqj8po97w_uihJEJ9es1QB0

var queryOrigin = "nashville tennessee";
var queryDestination = "Middletown new jersey";
var gasPrice = 0;
var milesPerGallon = 0;
var gallonsPerTank = 0;

var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + queryOrigin + "&destinations=" + queryDestination + "&key=AIzaSyDS40PLoeiiJqj8po97w_uihJEJ9es1QB0"
var proxyURL = "https://cors-anywhere.herokuapp.com/"

$.ajax({

    url: proxyURL + queryURL,
    method: "GET"

}).then(function (response) {

    var results = response.rows;

    var distance = results[0].elements[0].distance.text

    console.log(distance)
}, function (errorObject) {
    console.log("the read failed:" + errorObject.code)
});

var totalGasCost = 0;
var gallonsNeeded = distance / milesPerGallon;

totalGasCost = gallonsNeeded * gasPrice;

//}); //close document.ready