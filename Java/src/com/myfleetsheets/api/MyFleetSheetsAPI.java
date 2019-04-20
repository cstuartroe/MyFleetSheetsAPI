package com.myfleetsheets.api;

import java.util.HashMap;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.commons.cli.*;
import org.json.*;

public class MyFleetSheetsAPI
{
	public static String[] API_PARAM_FIELDS = {"since","make","model","serial","year","max_price","min_price","source"};

	public static String API_BASE_URL = "https://api.myfleetsheets.com/api/planes/?";

	public static void main( String[] args )
	{    
		String[] cli_args = {"email", "key", "filename", "since","make","model","serial","year","max_price","min_price","source"};

		Options options = new Options();

		Option email = new Option("e", "email", true, "your email address");
		email.setRequired(false);
		options.addOption(email);

		Option key = new Option("k", "key", true, "your API key");
		key.setRequired(false);
		options.addOption(key);

		Option filename = new Option("f", "filename", true, "credentials JSON file");
		filename.setRequired(false);
		options.addOption(filename);

		for (String field: MyFleetSheetsAPI.API_PARAM_FIELDS) {
			Option o = new Option(null, field, true, "see API documentation");
			o.setRequired(false);
			options.addOption(o);
		}

		CommandLineParser parser = new DefaultParser();
		HelpFormatter formatter = new HelpFormatter();
		CommandLine cmd = null;

		try {
			cmd = parser.parse(options, args);
		} catch (ParseException e) {
			System.out.println(e.getMessage());
			formatter.printHelp("java -jar MyFleetSheetsAPI.jar [options...]", options);
			System.exit(1);
		}

		HashMap<String, String> params = new HashMap<String, String>();

		for (String arg : cli_args) {
			if (cmd.hasOption(arg)) {
				params.put(arg, cmd.getOptionValue(arg));
			}
		}		

		try {
			String out = APIrequest_raw(params);
			System.out.println(out);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	public static String APIrequest_raw(HashMap<String, String> params) throws IllegalArgumentException, FileNotFoundException, IOException {
		String email = params.get("email");
		String key = params.get("key");
		String filename = params.get("filename");

		if (filename == null) {
			if (email == null || key == null) {
				throw new IllegalArgumentException("Please pass your email address and API key");
			}
		} else {
			if (email != null || key != null) {
				throw new IllegalArgumentException("If a credentials file is provided, there is no need to provide email and API key separately");
			}

			File file = new File(filename);
			BufferedReader br = new BufferedReader(new FileReader(file));
			String creds_raw = "";
			String line;
			while ((line = br.readLine()) != null) {
				creds_raw += line;
			}
			br.close();

			JSONObject creds = new JSONObject(creds_raw);

			try {
				email = creds.getString("email");
				key   = creds.getString("key");
			} catch (JSONException e) {
				throw new IllegalArgumentException("Invalid credentials file");
			}        
		}

		String url = MyFleetSheetsAPI.API_BASE_URL + "email=" + email + "&key=" + key + "&";

		for (String field : MyFleetSheetsAPI.API_PARAM_FIELDS) {
			if (params.containsKey(field)) {
				url += field + "=" + params.get(field) + "&";
			}
		}

		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		con.setRequestMethod("GET");
		BufferedReader in = new BufferedReader(new InputStreamReader(
				con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine + "\n");
		}
		in.close();

		return response.toString();

	}
	
	public static JSONObject APIrequest(HashMap<String, String> params) throws IllegalArgumentException, FileNotFoundException, IOException, JSONException {
		String result_raw = MyFleetSheetsAPI.APIrequest_raw(params);
		return new JSONObject(result_raw);
	}
}