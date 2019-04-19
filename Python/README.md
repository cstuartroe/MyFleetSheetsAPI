# The Python Fleet Sheets API wrapper

## Dependencies

This script is written for Python 3, and only makes use of native Python libraries,
so no additional packages need to be installed.

## The Python API

The method `APIrequest`, in addition to being used internally for the CLI, can also by used by other Python scripts. It accepts keyword arguments `f`, `e`, `k`, `since`, `make`, `model`, `serial`, `year`, `max_price`, `min_price`, and `source`, with usage equivalent to the command line arguments. It is preferred that the type of all arguments is a string or list of strings, but`max_price` and `min_price` may be integers, and `year` may be an integer or list of integers. Passing any argument with the value `None` has behavior equivalent to not passing it at all. `APIrequest` returns a Python `dict` object equivalent to the JSON received.

To use `APIrequest`, simply import `myfleetsheets_api.py` into your script, for example:

```
import myfleetsheets_api

listing_json = myfleetsheets_api.APIrequest(f = "credentials.json",since = "7d",make = ["embraer"])
```

See `example.py` for a more extensive example of usage.
