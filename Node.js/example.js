// replace with require("myfleetsheets_api") if myfleetsheets_api is installed in node_modules
const myfleetsheets_api = require("./myfleetsheets_api.js");

const PRINT_FIELDS = ["make","model","serial","registration","year"];

const prefs = {'email':'plane_enthusiast@example.com',
             'key':'b2I-Jh_pvGVeGGJ8',
             'since':'4d',
             'max_price':10000000,
             'year':'2012-2019',
             'make':["beechcraft","cessna","pilatus"],
             'source':null};

const w = 25;

function ljust(x, width) {
  return x + " ".repeat(width - String(x).length);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

PRINT_FIELDS.map( (field) => {
  process.stdout.write(capitalize(ljust(field, w)));
});
console.log();

myfleetsheets_api.APIrequest(prefs, (response) => {
  response["results"].map( (listing) => {
    PRINT_FIELDS.map( (field) => {
      if (listing[field]) {
        process.stdout.write(ljust(listing[field], w));
      } else {
        process.stdout.write(" ".repeat(w));
      }
    });
    console.log();
  });
});
