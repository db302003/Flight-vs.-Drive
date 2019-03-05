$(document).ready(function(){
    
    var cartoons = ["Bugs Bunny", "Porky Pig", "Tom & Jerry", "DuckTales", "Smurfs", "The Jetsons", "Mickey Mouse", "Scooby Doo", "Charlie Brown", "The Simpson", "The Flintstones"];
    
    function displaycartoonShow() {

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=J24Itxs0IT3e7tt5N0Nkfm84xyVgiaI3&q=cartoons";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
          $("cartoonview").empty();

          var results = response.data;

          console.log(response);

          for(var i = 0; i < results.length; i++) {

            var cartoonDiv = $("<div>");
          
            cartoonDiv.addClass("cartoonpictures");

            var rating = results[i].rating;
            var p = $("<h2>").text("Rating: " + rating);

            var cartoonImage = $("<img>");
            cartoonImage.attr("src", results[i].images.fixed_height_still.url);
            cartoonImage.attr("data-still", results[i].images.fixed_height_still.url);
            cartoonImage.attr("data-animate", results[i].images.fixed_height.url);
            cartoonImage.attr("data-state", "still");
            cartoonImage.addClass('cartoonImage');

            cartoonDiv.prepend(p);

            cartoonDiv.prepend(cartoonImage);
            $("#cartoonview").prepend(cartoonDiv);
          }

          $(".cartoonImage").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        });        
      }
      function renderButtons() {
        $("#cartoonbuttons").empty();

        for(var i = 0; i < cartoons.length; i++) {

          var cartoonAdd = $("<button>");

          cartoonAdd.addClass("cartoons");

          cartoonAdd.attr("data-name", cartoons[i]);

          cartoonAdd.text(cartoons[i]);

          $("#cartoonbuttons").append(animeAdd);
        }
      }

      $("#add-cartoon").on("click", function(event){
        event.preventDefault();

        var cartoons = $("#cartoon-input").val().trim();

        cartoons.push(cartoon);

        renderButtons();
      });

      $(document).on("click", ".cartoons", displaycartoonShow);

      renderButtons();
});