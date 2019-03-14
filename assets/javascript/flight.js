$(document).ready(function () {

  $("#compare").on("click", function (event) {
    event.preventDefault();

    console.log("test");

    var origin = $("#origin").val().trim();
    var destination = $("#destination").val().trim();
    var departDate = $("#depart").val().trim();
    // var returnDate = $("#return").val().trim();

    // var origin = "ATL";
    // var destination = "SEA";
    // var departDate = "2019-03-15";
    // var returnDate = "2019-04";

    console.log(origin);
    console.log(destination);
    console.log(departDate);
    // console.log(returnDate);

    var queryURL = "http://api.travelpayouts.com/v1/prices/cheap?origin=" + origin + "&destination=" + destination + "&depart_date=" + departDate + "&currency=USD&token=1f05289ab3a16e64e8b24b766475cee5"

    console.log(queryURL)

    var proxyURL = "https://cors-anywhere.herokuapp.com/"

    $.ajax({
      url: proxyURL + queryURL,
      method: "get",
      dataType: "JSON"

    }).then(function (response) {

      $("form").remove();
      console.log(response);
      console.log(destination);

      results = response.data[destination];


      var flights = Object.values(results || {});

      if (flights.length > 0) {

        for (var i = 0; i < flights.length; i++) {

          var flight = flights[i];

          $("body").append("<h2>$" + flight.price + " - " + flight.airline + " - " + flight.departure_at + "</h2>")

        }

      } else {

        alert("There are no flights for that date")

      }

      console.log(flights)
    });
  });
});