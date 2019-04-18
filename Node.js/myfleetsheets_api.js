const https = require("https");
const fs = require('fs');

const API_BASE_URL = "https://api.myfleetsheets.com/api/planes/?";

const API_PARAM_FIELDS = ["email","key","since","make","model","serial","year","max_price","min_price","source"];

function handle_options(options) {
	return new Promise( function(resolve, reject) {
		var params = {};

		for (field of API_PARAM_FIELDS.slice(2)) {
			params[field] = options[field];
		}

		if (options["filename"]) {
			if (options["email"] || options["key"]) {
				reject("If a credentials file is provided, there is no need to provide email and API key separately")
			} else {
				var raw_creds = fs.readFileSync(options["filename"], "utf8");
				var creds = JSON.parse(raw_creds);
				options["email"] = creds["email"];
				options["key"] = creds["key"];
				resolve(options);
			}
		} else {
			resolve(options);
		}
	});
}

function build_url(options) {
	var url = API_BASE_URL;
	for (var i = 0; i < 10; i++) {
		var field = API_PARAM_FIELDS[i];

		if (options[field]) {
		  url = url + field + "=" + options[field] + "&";
		}
	}
	return url;
}

function APIrequest(options, callback) {
	var ha = handle_options(options);
	ha.then( function (options) {
		var url = build_url(options);

		https.get(url, (resp) => {
		  let data = '';

		  // A chunk of data has been recieved.
		  resp.on('data', (chunk) => {
		    data += chunk;
		  });

		  // The whole response has been received. Print out the result.
		  resp.on('end', () => {
		    callback(JSON.parse(data));
		  });

		}).on("error", (err) => {
		  console.log("Error: " + err.message);
		});
	}, function (message) {
		throw message;
	})
}

exports.API_PARAM_FIELDS = API_PARAM_FIELDS
exports.APIrequest = APIrequest
