const https = require("https");

const API_BASE_URL = "https://api.myfleetsheets.com/api/planes/?";

const API_PARAM_FIELDS = ["email","key","since","make","model","serial","year","max_price","min_price","source"];

var args = process.argv.slice(2);

function APIrequest(prefs, callback) {
	var url = API_BASE_URL;

	for (var i = 0; i < 10; i++) {
		var field = API_PARAM_FIELDS[i];

		if (field in prefs) {
			url += field + "=" + prefs[field] + "&";
		}
	}

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
}

var prefs = {
	"email":"plane_enthusiast@example.com",
	"key":"b2I-Jh_pvGVeGGJ8&",
	"since":"4d",
	"max_price":10000000,
	"year":"2012-2019",
	"make":"BEECHCRAFT,CESSNA,PILATUS"
};

APIrequest(prefs, (listing_json) => {
	console.log(listing_json);
});