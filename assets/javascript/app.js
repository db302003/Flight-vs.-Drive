 $(document).ready(function () {

    $("#compare").on("click", function (event) {
      event.preventDefault();
  
      // var originX = $("#originAirport").val().trim().toUpperCase();
      // var destinationX = $("#destinationAirport").val().trim().toUpperCase();
      // var departDate = $("#depart").val().trim();
      // var returnDate = $("#return").val().trim();
  
      var originX = "LAS";
      var destinationX = "MCO";
      var departDate = "2019-04-15";
      var returnDate;
  
      var origin = originX + "-sky";
      var destination = destinationX + "-sky";
  
      checkFlights(origin, destination, departDate, returnDate);
      getTotalFuelCost(originX, destinationX);
    });
  
  
  
    function checkFlights(origin, destination, departDate, returnDate){
      $.ajax({
        url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + origin + "/" + destination + "/" + departDate + "?inboundpartialdate=" + returnDate + "/",
        type: 'GET',
        processData: false,
        headers: { 'X-RapidAPI-Key' : '0c3f5f89e9mshc4f5477381ec0f3p1020f4jsn3642d670322f' }
    }).then(function (response) {
      console.log(response);
  
      // var flight = Object.keys(response.Quotes);
      var flight = response.Quotes;
      var carriers = response.Carriers;
      var places = response.Places;
      var airline;
  
      if(flight.length === 1 && flight[0].Direct === false || flight.length === 0){
        $(".fly").css("display", "none");
        $(".nofly").css("display", "inline")
        $("#results").css("display", "inline");
      } else{
  
        for (var direct in flight) {
          if(flight[direct].Direct === true){
            var directFlight = flight[direct];
            var directFlightCarrierId = directFlight.OutboundLeg.CarrierIds[0];
            $("#totalFlightPrice").text("$" + directFlight.MinPrice);
            $("#route").html(places[0].IataCode + " <i class='fas fa-globe-americas'></i> " + places[1].IataCode);
            for(var key in carriers) {
              if(carriers[key].CarrierId === directFlightCarrierId) {
                airline = carriers[key].Name;
                $('#airline').text(airline);
              };
          };
      
          };
        };
  
        $("#results").css("display", "inline");
  
      }
  
      $('form').remove();
  
    });
    };
  






      //ajax call to get disance between two locations and multiply it by the average MPG
    function getTotalFuelCost(originX, destinationX) {

      var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + originX + "&destinations=" + destinationX + "&key=AIzaSyDS40PLoeiiJqj8po97w_uihJEJ9es1QB0"
      var proxyURL = "https://cors-anywhere.herokuapp.com/"

      $.ajax({

          url: proxyURL + queryURL,
          method: "GET"

      }).then(function (response) {

          console.log(response);

          var results = response.rows;

          distance = results[0].elements[0].distance.text;
          console.log("distance: " + distance)

          // distance = parseFloat(distance);

          console.log("distance " + distance)

          $("#miles").text(distance);


          var gallonsNeeded = distance / averageMPG;
          console.log("gallons needed: " + gallonsNeeded)

          var totalfuelCost = gallonsNeeded * fuelPrice;
          totalfuelCost = parseInt(totalfuelCost)
          console.log("total Cost " + totalfuelCost)

          $("#totalPrice").text(totalfuelCost);

      }, function (errorObject) {
          console.log("the read failed:" + errorObject.code)
      });
  
    };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
});
  
  
  
  
   