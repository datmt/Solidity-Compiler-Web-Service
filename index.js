const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const app = express();
const uploadFile = require("./modules/upload");
// enable files upload
app.use(uploadFile);
//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
//start app
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
