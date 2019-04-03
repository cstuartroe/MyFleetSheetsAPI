# Introducing the Fleet Sheets API!

We at [Fleet Sheets](https://www.myfleetsheets.com/) are rolling out a set of API wrappers for several programming languages, 
including C++, Java, Python, Javascript (client-side and Node.js), and PHP. These will enable you to easily access the Fleet Sheets API
in your programming language of choice, and each wrapper exposes two different methods of use:

 * A command-line interface
   * outputs plaintext JSON to standard terminal output, which can be redirected to a file
   * is essentially the same between languages
 * An API within the language
   * provides a method in the language to fetch API data as JSON (Python and JS) or a language-specific data structure (Java, C++, PHP)
   * varies slightly according to programming language

## The Fleet Sheets CLI

Each wrapper supports an identical CLI, which has the following parameters:

 * `-f`: The credentials filename (download from the [API portal](https://www.myfleetsheets.com/api/portal))
 * `-e`: The email address associated with your account
 * `-k`: Your API key
 * `--since`, `--make`, `--model`, `--serial`, `--year`, `--max_price`, `--min_price`, `--source`: See the [API description](https://api.myfleetsheets.com/api/) on our site.

If you pass a credentials file, don't pass email and API key separately, and vice versa.

Not sure what to query? Try this example command:

`./myfleetsheets_api -f credentials.json --year "2010-2019" --make "cessna, pilatus, embraer" --since "5d"`

(replacing `./myfleetsheets_api` with e.g. `python myfleetsheets_api.py`, `java MyFleetSheetsAPI.class`, `npm run myFleetSheetsAPI`, 
depending on which language you use)
