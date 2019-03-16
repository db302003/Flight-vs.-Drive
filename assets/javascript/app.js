$(document).ready(function () {
  $("#results").css("display", "none");
  $('.make-dropdown').prop('disabled', true);
  $('.model-dropdown').prop('disabled', true);
  $('.trim-dropdown').prop('disabled', true);
  var fuelPrice = 0;
  var averageMPG;
  var totalfuelCost = 0;

  $(function(){
    $("#depart").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0, maxDate: "+8M" });
  });


  // ajax call to get current average gas price
  $.ajax({

    url: "https://www.fueleconomy.gov/ws/rest/fuelprices/",
    method: "GET",
    dataType: "JSON"

  }).then(function (response) {

      fuelPrice = response.regular

      fuelPrice = parseFloat(fuelPrice);

      console.log("FUEL $: " + fuelPrice);
      $("#avgGas").text("$" + fuelPrice);
  }, function (errorObject) {
      console.log("the read failed:" + errorObject.code)
  });




  $("#compare").on("click", function (event) {
    event.preventDefault();

    var originX = $("#originAirport").val().trim().toUpperCase();
    var destinationX = $("#destinationAirport").val().trim().toUpperCase();
    var departDateX = $("#depart").val().trim();
    var departDate = departDateX;
    console.log(departDate);
    var returnDate;

    // var originX = "LAS";
    // var destinationX = "MCO";
    // var departDate = "2019-04-15";
    // var returnDate;

    var origin = originX + "-sky";
    var destination = destinationX + "-sky";

    checkFlights(origin, destination, departDate, returnDate);
    getTotalFuelCost(originX, destinationX);
  });
  
  
  
    function checkFlights(origin, destination, departDate, returnDate){
      $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" 
        + "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + origin + "/" + destination + "/" + departDate + "?inboundpartialdate=" + returnDate + "/",
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
            $("#route").html(places[0].IataCode + " <i class='fas fa-arrow-right'></i> " + places[1].IataCode);
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

        distance = distance.substring(0, distance.length-3).replace(',','');;
  
        distance = parseInt(distance);
        console.log(distance)

        // distance = parseFloat(distance);

        console.log("distance: " + distance)

        $("#miles").text(distance);
        console.log(averageMPG);


        var gallonsNeeded = distance / averageMPG;
        console.log("gallons needed: " + gallonsNeeded)

        var totalfuelCost = gallonsNeeded * fuelPrice;
        totalfuelCost = parseInt(totalfuelCost)
        console.log("total Cost " + totalfuelCost)

        $("#totalPrice").text("$" + totalfuelCost);

      }, function (errorObject) {
          console.log("the read failed:" + errorObject.code)
      });
  
    };























  //FROM GAS-PRICE.JS

  

    // ajax call to get list of vehicle year

  $.ajax({

    url: "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year",
    method: "GET",
    dataType: "JSON"

  }).then(function (response) {

      var carYear = response.menuItem

      for (var i = 0; i < carYear.length; i++) {

          var newDropButton = $("<button>")
          newDropButton.addClass("dropdown-item")
          newDropButton.addClass("car-year-value")
          newDropButton.attr("data-boundary", "scrollParent")
          newDropButton.attr("value", carYear[i].text)
          newDropButton.text(carYear[i].text)

          $(".car-year").append(newDropButton)

      }

  }, function (errorObject) {
      console.log("the read failed:" + errorObject.code)
  });


  // ajax call to get list of vehicle make


  function carMakeMenuFiller() {

      $.ajax({

          url: "https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=" + carYearValue,
          method: "GET",
          dataType: "JSON"

      }).then(function (response) {

          var carMake = response.menuItem

          console.log(carMake)

          for (var i = 0; i < carMake.length; i++) {


              var newDropButton = $("<button>")
              newDropButton.addClass("dropdown-item")
              newDropButton.addClass("car-make-value")
              newDropButton.attr("data-boundary", "scrollParent")
              newDropButton.attr("value", carMake[i].value)
              newDropButton.text(carMake[i].text)

              $(".car-make").append(newDropButton)
          }

      }, function (errorObject) {
          console.log("the read failed:" + errorObject.code)
      });
  }

  function carModelMenuFiller() {

      $.ajax({

          url: "https://www.fueleconomy.gov//ws/rest/vehicle/menu/model?year=" + carYearValue + "&make=" + carMakeValue,
          method: "GET",
          dataType: "JSON"

      }).then(function (response) {
          var carModel = response.menuItem;

          console.log(carModel);
          console.log(Array.isArray(carModel));

          if(Array.isArray(carModel) === false){
            var newDropButton = $("<button>")
            newDropButton.addClass("dropdown-item")
            newDropButton.addClass("car-model-value")
            newDropButton.attr("data-boundary", "scrollParent")
            newDropButton.attr("value", carModel.value)
            newDropButton.text(carModel.text)

            $(".car-model").append(newDropButton)
          }

          for (var i = 0; i < carModel.length; i++) {


              var newDropButton = $("<button>")
              newDropButton.addClass("dropdown-item")
              newDropButton.addClass("car-model-value")
              newDropButton.attr("data-boundary", "scrollParent")
              newDropButton.attr("value", carModel[i].value)
              newDropButton.text(carModel[i].text)

              $(".car-model").append(newDropButton)
          }

      }, function (errorObject) {
          console.log("the read failed:" + errorObject.code)
      });

  }

  function carTrimMenuFiller() {

      $.ajax({

          url: "https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=" + carYearValue + "&make=" + carMakeValue + "&model=" + carModelValue,
          method: "GET",
          dataType: "JSON"

      }).then(function (response) {

          var carTrim = response.menuItem;

          console.log("hi")

          console.log(carTrim);

          if(Array.isArray(carTrim) === false){
            var newDropButton = $("<button>")
            newDropButton.addClass("dropdown-item")
            newDropButton.addClass("car-trim-value")
            newDropButton.attr("data-boundary", "scrollParent")
            newDropButton.attr("value", carTrim.value)
            newDropButton.text(carTrim.text)

            $(".car-trim").append(newDropButton)
          }

          for (var i = 0; i < carTrim.length; i++) {


              var newDropButton = $("<button>")
              newDropButton.addClass("dropdown-item")
              newDropButton.addClass("car-trim-value")
              newDropButton.attr("data-boundary", "scrollParent")
              newDropButton.attr("value", carTrim[i].value)
              newDropButton.text(carTrim[i].text)

              $(".car-trim").append(newDropButton)
          }


      }, function (errorObject) {
          console.log("the read failed:" + errorObject.code)
      });

  }

  
  
  function getAverageMPG() {

      $.ajax({

          url: "https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/" + carTrimIDValue,

          method: "GET",
          dataType: "JSON"

      }).then(function (response) {
        console.log("getAverageMPG: " + response)

        // var response = response.avgMpg;
        if(response === undefined ){
          averageMPG = 24.7;
          $("#avgText").text("National Average MPG");
        } else{
          averageMPG = Math.floor(parseInt(response.avgMpg) * 100) / 100;
        };

        console.log("average MPG: " + averageMPG);
        $("#avgMPG").text(averageMPG);

        return averageMPG;


      }, function (errorObject) {
          console.log("the read failed:" + errorObject.code)
      });

  }

  

  function getYearValue() {

      carYearValue = $(this).val()
      console.log(carYearValue)

      $(".car-year-button-display").text(carYearValue)
      $('.make-dropdown').prop('disabled', false);
      return carYearValue

  }


  function getMakeValue() {

      carMakeValue = $(this).val()
      console.log(carMakeValue)

      $(".car-make-button-display").text(carMakeValue)
      $('.model-dropdown').prop('disabled', false);
      return carMakeValue

  }

  function getModelValue() {

      carModelValue = $(this).val()
      console.log(carModelValue)

      $(".car-model-button-display").text(carModelValue)
      $('.trim-dropdown').prop('disabled', false);
      return carModelValue

  }

  function getTrimIDValue() {


      carTrimIDValue = $(this).val();
      carTrimText = $(this).text();
      $(".car-trim-button-display").text(carTrimText)
      console.log(carTrimIDValue)


      return carTrimIDValue

  }

  $(document).on("click", ".car-year-value", getYearValue);
  $(document).on("click", ".car-year-value", carMakeMenuFiller);

  $(document).on("click", ".car-make-value", getMakeValue);
  $(document).on("click", ".car-make-value", carModelMenuFiller);

  $(document).on("click", ".car-model-value", getModelValue);
  $(document).on("click", ".car-model-value", carTrimMenuFiller);

  $(document).on("click", ".car-trim-value", getTrimIDValue);
  $(document).on("click", ".car-trim-value", getAverageMPG);


  $(".dropdown").on("click", function (event) {
      event.preventDefault();
  });
  
  
 
});
  
  
  
  
   