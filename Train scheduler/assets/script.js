
var config = {
    apiKey: "AIzaSyCDoK2iMF45rpWmQmdwG8Cvdc7GiBczQc4"
    authDomain: "train-scheduler-3feba.firebaseapp.com"
    datbaseURL: "https://console.firebase.google.com/project/base-starter/settings/general/",
    projectId: "tbase-starter",
    storageBucket: "train-scheduler-3feba.appspot.com",
    messagingSenderId: "440244767189"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(){
      event.preventDefault();
  
      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      var firstTrain = $("#first-train-input").val().trim();
      var trainFrequency = $("#frequency-input").val().trim();

      var newTrain = {
          name: trainName,
          destination: trainDestination,
          time: firstTrain,
          frequency: trainFrequency
      };
      database.ref().push(newTrain);
      
      alert("Train added");
 
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){
  
      console.log(childSnapshot.val());
  
      var trainName = childSnapshot.val().name;
      var trainDestination = childSnapshot.val().destination;
      var firstTrain = childSnapshot.val().time;
      var trainFrequency = childSnapshot.val().frequency;
  
      var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
   
      var currentTime = moment();
    
      var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

      var trainTimeRemainder = diffTime % trainFrequency;

      var trainXminsAway = trainFrequency - trainTimeRemainder;

      var nextTrainArrival = moment().add(trainXminsAway, "minutes").format("hh:mm A");

      $("#train-table > tbody").append(
          `<tr id="train-table-body">
               <td> ${trainName} </td>
               <td> ${trainDestination} </td>
               <td> ${trainFrequency} </td>
               <td> ${nextTrainArrival} </td>
               <td> ${trainXminsAway} </td>
           </tr>`
      );

  }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });  