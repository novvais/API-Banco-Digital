const express = require("express");
const route = require("./routes/routes");

const app = express();

app.use(express.json());

app.use(route)

app.listen(process.env.PROT || 3000);