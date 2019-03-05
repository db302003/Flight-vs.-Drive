function displayAnimeShow() {
   

var queryURL = "https://giphy.com/gifs/rupauls-drag-race-GHGF7hGQjCKbu";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });