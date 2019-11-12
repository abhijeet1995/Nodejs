const express = require("express");
const bodyparser = require("body-parser"); //turns response into usable format
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const employeesRouter = require("./routes/employees");
const db = require("./connection");
const app = express();

app.use(bodyparser.json());
app.use(helmet());
app.use("/employees", employeesRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
