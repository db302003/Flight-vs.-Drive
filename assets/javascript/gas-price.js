$(document).ready(function () {

// apikey AIzaSyDS40PLoeiiJqj8po97w_uihJEJ9es1QB0

var queryOrigin = "nashville tennessee";
var queryDestination = "Middletown new jersey";
var gasPrice = 3;
var milesPerGallon = 0;
var gallonsPerTank = 0;

var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + queryOrigin + "&destinations=" + queryDestination + "&key=AIzaSyDS40PLoeiiJqj8po97w_uihJEJ9es1QB0"
var proxyURL = "https://cors-anywhere.herokuapp.com/"


//ajax call to get disance between two locations
$.ajax({

    url: proxyURL + queryURL,
    method: "GET"

}).then(function (response) {

    var results = response.rows;

    var distance = results[0].elements[0].distance.text

    console.log(distance)

    var totalGasCost = 0;
    var gallonsNeeded = distance / milesPerGallon;

    totalGasCost = gallonsNeeded * gasPrice;
}, function (errorObject) {
    console.log("the read failed:" + errorObject.code)
});


// ajax call to get current average gas price
$.ajax({

    url: proxyURL + "https://www.fueleconomy.gov/ws/rest/fuelprices/",
    method: "GET",
    dataType: "JSON"

}).then(function (response) {

    var fuelPrice = response.regular

    console.log(fuelPrice)
}, function (errorObject) {
    console.log("the read failed:" + errorObject.code)
});




// ajax call to get list of vehicle makes

$.ajax({

    url: proxyURL + "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year",
    method: "GET",
    dataType: "JSON"

}).then(function (response) {

var carYear = response.menuItem

for(var i = 0; i < carYear.length; i++){


    var newDropButton = $("<button>")
    newDropButton.addClass("dropdown-item")
    newDropButton.addClass("car-year-value")
    newDropButton.attr("data-boundary", "scrollParent")
    newDropButton.attr("value", carYear[i].value)
    newDropButton.text(carYear[i].text)

    $(".car-year").append(newDropButton)


}


}, function (errorObject) {
    console.log("the read failed:" + errorObject.code)
});



function getYearValue() {
    
    var carYearValue = $(".car-year-value").val

}

$(document).on("click", ".car-year-value", getYearValue);


}); //close document.ready