const commander = require("commander");
const myfleetsheets_api = require("./myfleetsheets_api.js");

commander
  .version('1.0.0', '-v, --version')
  .option('-e --email [email]')
  .option('-k --key [key]')
  .option('-f --filename [filename]')
  .option('--since [since]')
  .option('--make [make]')
  .option('--model [model]')
  .option('--serial [serial]')
  .option('--year [year]')
  .option('--max_price [max_price]')
  .option('--min_price [min_price]')
  .option('--source [source]')
  .parse(process.argv);

myfleetsheets_api.APIrequest(commander, (listing_json) => {
  console.log(JSON.stringify(listing_json, null, 4));
});
