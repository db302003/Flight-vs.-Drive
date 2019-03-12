$( document ).ready(function() {

  $("#compare").on("click", function(event) {
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
      method: "get"
    }).then(function(response) {

      $("form").remove();
      var flights = [];
      console.log(response);
      console.log(destination);

      results = response.data[destination];

      for (var key in results) {
        // console.log(flights[key].flight_number)
        flights.push(results[key]);
        $("body").append("<h2>$" + results[key].price + " - " + results[key].airline  + " - " + results[key].departure_at + "</h2>")
      }

      console.log(flights)
      
    });



  });


});
