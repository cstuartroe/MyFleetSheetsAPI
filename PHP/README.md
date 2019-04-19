# The PHP Fleet Sheets API wrapper

## Dependencies

This script will work with any version of PHP >=5.2, and only makes use of native PHP functions.

## The PHP CLI

Importantly, the PHP command line interface requires the use of equal signs `=` for arguments! For example:

```
php myfleetsheets_api.php -f=credentials.json
```

## The PHP API

`myfleetsheets_api.php` exposes two methods: `APIrequest_raw`, which returns the raw API response as a string, and `APIrequest`, which returns an associative array analogous to the JSON response. Both methods have the same argument set - in fact, `APIrequest` is just `APIrequest_raw` wrapped in a simple call to `json_decode`. They take a single argument `$options` which should be an associative array with string keys from the set `filename`, `email`, `key`, `since`, `make`, `model`, `serial`, `year`, `max_price`, `min_price`, and `source`, with usage equivalent to the corresponding command line arguments. It is preferred that the type of all arguments is a string or array of strings, but `max_price` and `min_price` may be integers, and `year` may be an integer or array of integers. Passing any argument with the value `NULL` has behavior equivalent to not passing it at all.

To use `APIrequest` or `APIrequest_raw`, simply use `require './myfleetsheets_api.php'` (using the appropriate relative path to `myfleetsheets_api.php`) in your script, for example:

```
require './myfleetsheets_api.php'

echo APIrequest_raw(["filename" => "credentials.json", "since" => "7d", "make" => ["embraer"]]);
```

See `example.php` for a more extensive example of usage.
