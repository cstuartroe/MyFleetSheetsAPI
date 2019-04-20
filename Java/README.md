# The Java Fleet Sheets API wrapper

## Dependencies

This project makes use of the [`org.json`](https://github.com/stleary/JSON-java) and [`org.apache.commons.cli`](https://github.com/apache/commons-cli) packages. These can be downloaded as JARs and put in `lib`, or included as Maven dependencies. `MyFleetSheetsAPI.jar` has these two libraries bundled in, so using it does not require installing any dependencies.

## The Java CLI

The easiest way to use the Java CLI is with the included JAR, e.g.,

```
java -jar MyFleetSheetsAPI.jar [options]
```

If you want to modify it, you can download JARs for the two dependencies into `lib`, then compile into `bin` with Eclipse and run

```
java -p bin:lib -m com.myfleetsheets.api/com.myfleetsheets.api.MyFleetSheetsAPI [options]
```

## The JS API

`MyFleetSheetsAPI` exposes two methods: `APIrequest_raw`, which returns the raw API response as a string, and `APIrequest`, which returns a `JSONObject`. Both methods take a single argument `HashMap<String, String> params` with string keys from the set `filename`, `email`, `key`, `since`, `make`, `model`, `serial`, `year`, `max_price`, `min_price`, and `source`, with usage equivalent to the corresponding command line arguments.
