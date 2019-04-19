# Introducing the Fleet Sheets API!

We at [Fleet Sheets](https://www.myfleetsheets.com/) are rolling out a set of API wrappers for several programming languages,
including C++, Java, Python, Javascript (client-side and Node.js), Ruby, and PHP. These will enable you to easily access the Fleet Sheets API
in your programming language of choice, and each wrapper exposes two different methods of use:

 * A command-line interface
   * outputs plaintext JSON to standard terminal output, which can be redirected to a file
   * is essentially the same between languages
 * An API within the language
   * provides a method in the language to fetch API data as JSON or a close equivalent (Python, Ruby, JS, PHP) or a language-specific data structure (Java, C++)
   * varies slightly according to programming language

## The Fleet Sheets CLI

Each wrapper supports an identical CLI, which has the following parameters:

 * `-f`: The credentials filename (a download link will be provided in your Fleet Sheets email updates)
 * `-e`: The email address associated with your account
 * `-k`: Your API key
 * `--since`, `--make`, `--model`, `--serial`, `--year`, `--max_price`, `--min_price`, `--source`: See the [API description](https://api.myfleetsheets.com/api/) on our site.

If you pass a credentials file, don't pass email and API key separately, and vice versa.

Not sure what to query? Try this example command:

`./myfleetsheets_api -e plane_enthusiast@example.com -k b2I-Jh_pvGVeGGJ8  --since 4d --max_price 10000000 --year 2012-2019 --make beechcraft,cessna,pilatus`

(replacing `./myfleetsheets_api` with e.g. `python myfleetsheets_api.py`, `java MyFleetSheetsAPI.class`, `node myfleetsheets_api_cli.js`, `ruby myfleetsheets_api.rb`
depending on which language you use)
