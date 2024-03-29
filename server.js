var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [];

// paths 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/reservation", function (req, res) {
    return res.json(reservations);
});

function checkForPreviousReservation(email) {

    console.log("input email: "+email);
    for (i=0; i < reservations.length; i++) {
        console.log("checking against email: "+reservations[i].email);
        if (reservations[i].email === email) {
            return true;
        }
    }
    return false;

}

// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  if (checkForPreviousReservation(newReservation.email) == true) {
    console.log("Reservation has been made previously.")
    res.json("already-made")
    return;
  }

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log("New Reservation: "+newReservation);

  reservations.push(newReservation);

  res.json(newReservation);
});

  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });