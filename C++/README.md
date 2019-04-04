# The C++ Fleet Sheets API wrapper

## Dependencies

This C++ module uses the system installation of [cURL](https://curl.haxx.se/) to make web requests, 
so you must have `curl` avalable at the command line as a prequisite to using the C++ wrapper. It also makes use of 
Niels Lohmanns' JSON library, which can be downloaded as a [a single install](https://github.com/nlohmann/json/blob/develop/single_include/nlohmann/json.hpp).
Download `json.hpp` and place it a directory `nlohmann` inside the directory with `myfleetsheets_api.cpp` prior to compilation.

## Build

This wrapper can be compiled with any C++ compiler supporting C++ 11 or later. We recommend compiling to an executable called `myfleetsheets_api`.
