const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// initialize an app
const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
// path for view engine to look into
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials"); // path for view engine to look into
// set template engine we are gonna use
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Shun Kayu",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Robot Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Merry Christmas",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecast,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Anonymous",
    error: "Help articles not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Anonymous",
    error: "My 404 Page",
  });
});

// serve up and start listening
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
