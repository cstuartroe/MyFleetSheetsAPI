# The Ruby Fleet Sheets API wrapper

## Dependencies

This script is written for Ruby 2, and only makes use of native Ruby libraries,
so no gem installations are needed.

## The Ruby API

`myfleetsheets_api.rb` exposes two methods: `APIrequest_raw`, which returns the raw API response as a string, and `APIrequest`, which returns a hash analogous to the JSON response. Both methods have the same argument set - in fact, `APIrequest` is just `APIrequest_raw` wrapped in a simple call to `JSON.parse`. They take a single argument `options` which should be a hash with string keys from the set `filename`, `email`, `key`, `since`, `make`, `model`, `serial`, `year`, `max_price`, `min_price`, and `source`, with usage equivalent to the corresponding command line arguments. It is preferred that the type of all arguments is a string or list of strings, but `max_price` and `min_price` may be integers, and `year` may be an integer or list of integers. Passing any argument with the value `nil` has behavior equivalent to not passing it at all.

To use `APIrequest` or `APIrequest_raw`, simply use `require('./myfleetsheets_api.rb')` (using the appropriate relative path to `myfleetsheets_api.rb`) in your script, for example:

```
require './myfleetsheets_api.rb'

puts APIrequest_raw({"filename" => "credentials.json", "since" => "7d", "make" => ["embraer"]})
```

See `example.rb` for a more extensive example of usage.
