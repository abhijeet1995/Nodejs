const express = require("express");
const router = express.Router();
const db = require("../connection");
const { Parser } = require("json2csv");
const fields = [];
const opts = { fields };
const fs = require("fs");
const json2csv = require("json2csv").parse;
const mysqldump = require("mysqldump");

var settings = {};
var chunkSize = 1000;

router.get("/", (req, res) => {
  // dump the result straight to a file
  // mysqldump({
  //   connection: {
  //     host: "localhost",
  //     user: "root",
  //     password: "",
  //     database: "employees"
  //   },
  //   dump: {
  //     tables: ["emptbl"],
  //     excludeTables: false,
  //     schema: false,
  //     trigger: false
  //   },
  //   dumpToFile: "dump.csv"
  // });
  db.query("SELECT * FROM `emptbl`", (err, rows, field) => {
    if (!err) {
      console.log(rows);
      try {
        const parser = new Parser(opts);
        const csv = parser.parse(rows);
        console.log(csv);
        fs.writeFileSync("file.csv", JSON.stringify(csv), function(err) {
          if (err) throw err;
          console.log("employees file saved");
          res.send(rows);
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
