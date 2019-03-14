$(document).ready(function () {

  $("#compare").on("click", function (event) {
    event.preventDefault();

    var originX = $("#originAirport").val().trim();
    var destinationX = $("#destinationAirport").val().trim();
    var departDate = $("#depart").val().trim();
    var returnDate = $("#return").val().trim();

    var origin = originX + "-sky";
    var destination = destinationX + "-sky";
    // var departDate = "2019-04-15";
    // var returnDate = "2019-04-25";


    $.ajax({
      url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + origin + "/" + destination + "/" + departDate + "?inboundpartialdate=" + returnDate + "/",
      type: 'GET',
      processData: false,
      headers: { 'X-RapidAPI-Key' : '0c3f5f89e9mshc4f5477381ec0f3p1020f4jsn3642d670322f' }
  }).then(function (response) {
    console.log(response)

    // var flight = Object.keys(response.Quotes);
    var flight = response.Quotes;
    var carriers = response.Carriers;
    var places = response.Places;
    var airline;

    for (var direct in flight) {
      if(flight[direct].Direct === true){
        var directFlight = flight[direct];
        var directFlightCarrierId = directFlight.OutboundLeg.CarrierIds[0];
        $("#totalFlightPrice").text("$" + directFlight.MinPrice);
        $("#route").text(places[0].IataCode + " > " + places[1].IataCode);
        console.log(directFlightCarrierId)
        console.log(directFlight)
        for(var key in carriers) {
          if(carriers[key].CarrierId === directFlightCarrierId) {
            airline = carriers[key].Name;
            $('#airline').text(airline);
          }
      }
  
      }
    }

    $('form').remove();
    $("#results").css("display", "inline");

    // var filtered = keys.filter(function(key) {
    //     return obj[key]
    // });


  });

  



    // var origin = $("#originAirport").val().trim();
    // var destination = $("#destinationAirport").val().trim();
    // var departDate = $("#depart").val().trim();
    // var returnDate = $("#return").val().trim();

    // var origin = "ATL";
    // var destination = "SEA";
    // var departDate = "2019-04-15";
    // var returnDate = "2019-04";

    // console.log(origin);
    // console.log(destination);
    // console.log(departDate);

    // var queryURL = "http://api.travelpayouts.com/v1/prices/cheap?origin=" + origin + "&destination=" + destination + "&depart_date=" + departDate + "&currency=USD&token=1f05289ab3a16e64e8b24b766475cee5"

    // console.log(queryURL)

    // var proxyURL = "http://cors-anywhere.herokuapp.com/"

    // $.ajax({
    //   url: proxyURL + queryURL,
    //   method: "get"
    // }).then(function (response) {

    //   // $("form").remove();
    //   console.log(response);
    //   console.log(destination);

    //   results = response.data[destination];


    //   var flights = Object.values(results || {});

    //   if (flights.length < 0) {

    //     for (var i = 0; i < flights.length; i++) {

    //       var flight = flights[i];

    //       $("body").append("<h2>$" + flight.price + " - " + flight.airline + " - " + flight.departure_at + "</h2>")

    //     }

    //   } else {

    //     console.log("There are no flights for that date")

    //     departDate = "2019-04";

    //     var queryURL = "http://api.travelpayouts.com/v2/prices/week-matrix?origin=" + origin + "&destination=" + destination + "&depart_date=" + departDate + "&currency=USD&token=1f05289ab3a16e64e8b24b766475cee5"

    //     $.ajax({
    //       url: proxyURL + queryURL,
    //       method: "get",
    //       dataType: "JSON"

    //     }).then(function (response) {

    //       console.log(response.data)

    //     })

    //     console.log(flights)
    //   }
    // });

  });
});


// unirest.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-05-01")
// .header("X-RapidAPI-Key", "0c3f5f89e9mshc4f5477381ec0f3p1020f4jsn3642d670322f")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });


