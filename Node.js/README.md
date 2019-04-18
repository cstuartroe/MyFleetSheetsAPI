# The Python Fleet Sheets API wrapper

## Dependencies

The command line interface makes use of the package `commander`.

## Installation

This wrapper is available on npm, so the simplest way to install it is with `npm install myfleetsheets_api`

## Structure

The file `myfleetsheets_api.js` is the main file of the package, and exports the function `APIrequest`. The file `myfleetsheets_api_cli.js` is used for the CLI, e.g.:

```
node myfleetsheets_api_cli.js -e plane_enthusiast@example.com -k b2I-Jh_pvGVeGGJ8 --since 4d --max_price 10000000 --year 2012-2019 --make beechcraft,cessna,pilatus
```

## The JS API

The method `APIrequest`, in addition to being used internally for the CLI, can also by used by other Python scripts. It accepts two arguments: `options`, a JSON object with keys `filename`, `email`, `key`, `since`, `make`, `model`, `serial`, `year`, `max_price`, `min_price`, and `source` that behave as expected, and `callback`, the callback function to which the full JSON response of the Fleet Sheets API will be passed upon resolution. Passing any key in `options` with the value `null` has behavior equivalent to not passing it at all.

To use `APIrequest`, simply import `myfleetsheets_api` into your script, for example:

```
myfleetsheets_api = require("myfleetsheets_api");

var prefs = {'filename':'credentials.json',
             'since':'7d',
             'make':'embraer'};

myfleetsheets_api.APIrequest(prefs, (response) => {
  console.log(JSON.stringify(response, null, 4));
});
```
