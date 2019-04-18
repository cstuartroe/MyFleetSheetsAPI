const commander = require("commander");
const myfleetsheets_api = require("./myfleetsheets_api.js");

commander
  .version('1.0.3', '-v, --version')
  .option('-e --email [email]', "your email address")
  .option('-k --key [key]', "your API key")
  .option('-f --filename [filename]', "credentials JSON file")
  .option('--since [since]', "a time expression representing how far in the past to look, e.g., 6h, 7d, 2w")
  .option('--make [make]', "a make, or comma separated list of makes")
  .option('--model [model]', "a model, or comma-separated list of models")
  .option('--serial [serial]', "a serial, or comma-separated list of serials")
  .option('--year [year]', "a year, a comma-separated list of years, or a range of years")
  .option('--max_price [max_price]', "the maximum asking price")
  .option('--min_price [min_price]', "the minimum asking price; setting min_price excludes planes with unknown or non-numeric prices")
  .option('--source [source]', "a source, or comma-separated list of sources")
  .parse(process.argv);

myfleetsheets_api.APIrequest(commander, (listing_json) => {
  console.log(JSON.stringify(listing_json, null, 4));
});
