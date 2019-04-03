# The client-side JS Fleet Sheets API wrapper

This API wrapper for JS in the browser couldn't be simpler - one short function that just handles constructing the URL and
making the AJAX request. It takes as input a JSON dictionary of query parameters and a callback function, and when the AJAX
request completes it passes the entire JSON response to the callback.

You can see an example of how to use the wrapper with `example.html` - just download them both to the same directory and 
open `example.html` in any browser, and see it magically become populated with information!
