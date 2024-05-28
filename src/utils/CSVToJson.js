const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const CSV_FILE_PATH = "src/data/csv"
const JSON_FILE_PATH = "src/data/json"

const csvFilePath = path.join(CSV_FILE_PATH, '2019.csv'); // Path to your CSV file
const jsonFilePath = path.join(JSON_FILE_PATH, '2019.json'); // Path to save JSON file

console.log(csvFilePath)

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2), 'utf-8');
    console.log('CSV file successfully converted to JSON.');
  })
  .catch((err) => {
    console.error('Error converting CSV to JSON:', err);
  });
