// Dependencies
const express = require("express");
const mongoose = require("mongoose");

// Setting up Express App
const app = express();
const PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Mongoose boilerplate
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

// Required routing
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Starts the server to begin listening
app.listen(PORT, function(){
    console.log(`App listening on Port ${PORT}!`);
});