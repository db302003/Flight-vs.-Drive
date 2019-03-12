$( document ).ready(function() {

  $("#compare").on("click", function(event) {
    event.preventDefault();

    console.log("test");

    var origin = $("#origin").val().trim();
    var destination = $("#destination").val().trim();
    // var depart = $("#depart").val().trim();
    // var return = $("#return").val().trim();

    var queryURL = "http://api.travelpayouts.com/v1/prices/cheap?origin=" + origin + "&destination=" + destination + "&&currency=USD&token=1f05289ab3a16e64e8b24b766475cee5"
    var proxyURL = "https://cors-anywhere.herokuapp.com/"
  
    $.ajax({
      url: proxyURL + queryURL,
      method: "get"
    }).then(function(response) {
      console.log(response);
    });



  });


});