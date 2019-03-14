$(document).ready(function () {

    $('.make-dropdown').prop('disabled', true);
    $('.model-dropdown').prop('disabled', true);
    $('.trim-dropdown').prop('disabled', true);

    // apikey AIzaSyDS40PLoeiiJqj8po97w_uihJEJ9es1QB0

    var queryOrigin = "nashville tennessee";
    var queryDestination = "Middletown new jersey";
    var fuelPrice = 0;
    var averageMPG = 0;
    var totalGasCost = 0;

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


        var gallonsNeeded = distance / averageMPG;

        totalGasCost = gallonsNeeded * fuelPrice;
        
    }, function (errorObject) {
        console.log("the read failed:" + errorObject.code)
    });


    // ajax call to get current average gas price
    $.ajax({

        url: proxyURL + "https://www.fueleconomy.gov/ws/rest/fuelprices/",
        method: "GET",
        dataType: "JSON"

    }).then(function (response) {

        fuelPrice = response.regular

        console.log(fuelPrice)
    }, function (errorObject) {
        console.log("the read failed:" + errorObject.code)
    });




    // ajax call to get list of vehicle year

    $.ajax({

        url: proxyURL + "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year",
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

            url: proxyURL + "https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=" + carYearValue,
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

            url: proxyURL + "https://www.fueleconomy.gov//ws/rest/vehicle/menu/model?year=" + carYearValue + "&make=" + carMakeValue,
            method: "GET",
            dataType: "JSON"

        }).then(function (response) {
            var carModel = response.menuItem

            console.log(carModel)

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

            url: proxyURL + "https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=" + carYearValue + "&make=" + carMakeValue + "&model=" + carModelValue,
            method: "GET",
            dataType: "JSON"

        }).then(function (response) {

            var carTrim = response.menuItem

            console.log(carTrim)

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

    function getAerageMPG() {

        $.ajax({

            url: proxyURL + "https://www.fueleconomy.gov//ws/rest/ympg/shared/ympgVehicle/" + carTrimIDValue,

            method: "GET",
            dataType: "JSON"

        }).then(function (response) {

            console.log(response)
            averageMPG = response.avgMpg

            console.log("average MPG: " + averageMPG)

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

        carTrimIDValue = $(this).val()
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
    $(document).on("click", ".car-trim-value", getAerageMPG);



}); //close document.ready