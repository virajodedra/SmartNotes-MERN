const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


require("dotenv").config();

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(process.env.PORT || 3000, () => {
      console.log("Connection to the Database was established!");
    })
  )
  .catch((error) => console.log(error));

// Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// CORS
app.use(
  cors({
    origin: "*",
    
  })
);

const routes = require("./routes/routes");
app.use(routes);
