# The C++ Fleet Sheets API wrapper

## Dependencies

This C++ module uses the system installation of [cURL](https://curl.haxx.se/) to make web requests,
so you must have `curl` avalable at the command line as a prequisite to using the C++ wrapper. It also makes use of
Niels Lohmanns' JSON library, which can be downloaded as a [a single install](https://github.com/nlohmann/json/blob/develop/single_include/nlohmann/json.hpp).
Download `json.hpp` and place it a directory `nlohmann` inside the directory with `myfleetsheets_api.cpp` prior to compilation.

## Build

This wrapper can be compiled with any C++ compiler supporting C++ 11 or later. We recommend compiling to an executable called `myfleetsheets_api`.

## Usage

Currently, the C++ wrapper can only be used via CLI, returning API response to stdout where it can be redirected to a JSON file.

```
./myfleetsheets_api -e plane_enthusiast@example.com -k b2I-Jh_pvGVeGGJ8 --since 4d --max_price 10000000 --year 2012-2019 --make beechcraft,cessna,pilatus > listings.json
```
