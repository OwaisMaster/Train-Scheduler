
var name;
var departure;
var destination;
var firstArrival;
var frequency;
var minAway;
var trainFirebaseData;
var newFirebaseData;
var time;
var clock;

$(document).ready(function () {

    function currentTime() {
        time = moment().format("hh:mm:ss A");
        $("#time").text(time);
    }
    clock = setInterval(currentTime , 1000);

    var firebaseConfig = {
        apiKey: "AIzaSyAKQ1J3f9-TkU2qzXEoA-a4g28g6rOscKA",
        authDomain: "train-schedule-8b072.firebaseapp.com",
        databaseURL: "https://train-schedule-8b072.firebaseio.com",
        projectId: "train-schedule-8b072",
        storageBucket: "",
        messagingSenderId: "861151852745",
        appId: "1:861151852745:web:8c739b87af47d679b93518"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      var database = firebase.database();

      $("#submitButton").on("click", function (event) {
        event.preventDefault();
        checkInput();
        name = $('#train-name').val();
        departure = $("#departure-name").val();
        destination = $('#destination-name').val();
        firstArrival = $('#arrival-time').val();
        frequency = $('#freq-input').val();
        console.log(firstArrival);

        trainData = {
            trainName: name,
            trainDep: departure,
            traindest: destination,
            trainFirstArrival: firstArrival,
            trainFreq: frequency
        };
        console.log("Name: ", name);
        console.log("Destination: ", destination);
        console.log("First Arrival: ", firstArrival);
        console.log("Frequency(min): ", frequency);

        database.ref().push(trainData);
        clear();
    });
    database.ref().on("child_added", function (snapshot) {
        var snapName = snapshot.val().trainName;
        var snapDest = snapshot.val().traindest;
        var snapFreq = snapshot.val().trainFreq;
        var snapDep = snapshot.val().trainDep;
        var snapArrival = snapshot.val().trainFirstArrival;

        var currentTime = moment().format('LT');
        console.log(currentTime);
        var arrival = moment(snapArrival, "HH:mm");
        var arrivalConverted = arrival.format("HH:mm A");
        console.log(arrivalConverted);

        var difference = moment().diff(arrival, "minutes");
        console.log(difference);

        var left = difference % snapFreq;

        var timeLeft = snapFreq - left;
        var newArrival = moment().add(timeLeft, "m").format("HH:mm A");
        console.log(newArrival);
        $("#train-table").append("<tr><td>" + snapName + "</td><td>" + snapDep + "</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" + newArrival + "</td><td>" + timeLeft + "</td></tr>");

    });
    function clear() {
        $("#train-name").val("");
        $("#destination-name").val("");
        $("#arrival-time").val("");
        $("#freq-input").val("");
        $("#departure-name").val("");
    }

    function checkInput() {
        if (!$("#train-name").val()) {
            return;
        } else if (!$("#destination-name").val()) {
            return;
        } else if (!$("#arrival-time").val()) {
            return;
        } else if (!$("#freq-input").val()) {
            return;
        } else if (!$("#departure-name").val()) {
            return;
        }
    }
});