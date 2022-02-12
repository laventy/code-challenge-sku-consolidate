const { Parser } = require("json2csv");
fs = require("fs");

const writeJsonToCsvFile = (json, path) => {
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(json);

  fs.writeFile(path, csv, (err) => {
    if (err) return console.log(err);
    console.log("write successfully");
  });
};

module.exports = writeJsonToCsvFile;
