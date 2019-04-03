function APIrequest(prefs, callback) {
	var Http = new XMLHttpRequest();
	var url = 'https://api.myfleetsheets.com/api/planes/?';
	var fields = ["email","key","since","make","model","serial","year","max_price","min_price","source"];

	for (var i = 0; i < 10; i++) {
		if (fields[i] in prefs) {
			url += fields[i] + "=" + prefs[fields[i]] + "&";
		}
	}

	Http.open("GET", url);
	Http.send();

	Http.onreadystatechange = (e)=>{
		if (Http.readyState == 4 && Http.status == 200) {
			var text = Http.responseText;
			callback(JSON.parse(text));
		}
	}
}