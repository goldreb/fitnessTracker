const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//connection to localhost and mongo atlas
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fitnessTracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
