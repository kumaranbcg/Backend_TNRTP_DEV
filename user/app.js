require("dotenv/config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
let routers = require("./routes/routes.js");
const mysql = require("mysql2");

const app = express();
const router = express.Router();
// middle wares section
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	next();
});
app.use(routers);
// create the connection to database

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
