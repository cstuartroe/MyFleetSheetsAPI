#include "nlohmann/json.hpp" // this is the single include file https://github.com/nlohmann/json/blob/develop/single_include/nlohmann/json.hpp
#include <string>
#include <iostream>
#include <fstream>
#include <stdio.h>

// for convenience
using json = nlohmann::json;
using namespace std;

struct MFS_Credentials {
	string email;
	string key;
};

MFS_Credentials get_creds(string filename) {
	ifstream t;
    t.open(filename);
    string whole, line;
    while(!t.eof()){
        getline(t,line);
        whole += line;
    }
    t.close();

    json file_json = json::parse(whole);
    MFS_Credentials creds = MFS_Credentials();
    creds.email = file_json["email"];
    creds.key = file_json["key"];
    return creds;
}

string exec(const char* cmd) {
    char buffer[128];
    string result = "";
    FILE* pipe = popen(cmd, "r");
    if (!pipe) throw runtime_error("popen() failed!");
    try {
        while (fgets(buffer, sizeof buffer, pipe) != NULL) {
            result += buffer;
        }
    } catch (...) {
        pclose(pipe);
        throw;
    }
    pclose(pipe);
    return result;
}

string APIrequest(string creds_filename = "", string email = "", string key = "", string since = "", string make = "", string model = "", 
	              string serial = "", string year = "", string max_price = "", string min_price = "", string source = "") {

	string command = "curl -ksb -H \"Accept: application/json\" \"https://api.myfleetsheets.com/api/planes/?";

	if (creds_filename != "") {
		if (email != "" || key != "") {
			printf("If a credentials file is provided, there is no need to provide email and API key separately");
			exit(EXIT_FAILURE);
		}
		MFS_Credentials creds = get_creds(creds_filename);
		email = creds.email; key = creds.key;
	}

	string fields[10]     = { email,   key,   since,   make,   model,   serial,   year,   max_price,   min_price,   source};
	string fieldnames[10] = {"email", "key", "since", "make", "model", "serial", "year", "max_price", "min_price", "source"};
	for (int i = 0; i < 10; i++) {
		if (fields[i] != "") {
			command += fieldnames[i] + "=" + fields[i] + "&";
		}
	}

	command += "\"";
	// printf("%s\n", command.c_str());

	return exec(command.c_str());	
}

int main(int argc, char* argv[]) {
	string creds_filename = "", email = "", key = "", since = "", make = "", model = "", serial = "", year = "",
	       max_price = "", min_price = "", source = "";

	int argi = 1;
	while (argi < argc) {
		string flag = argv[argi];
		if (argi + 1 == argc) { printf("Argument must have value: %s\n", flag.c_str()); exit(EXIT_FAILURE); }
		string value = argv[argi+1];
		argi += 2;

		if      (flag == "-f")          { creds_filename = value; }
		else if (flag == "-e")          { email          = value; }
		else if (flag == "-k")          { key            = value; }
		else if (flag == "--since")     { since          = value; }
		else if (flag == "--make")      { make           = value; }
		else if (flag == "--model")     { model          = value; }
		else if (flag == "--serial")    { serial         = value; }
		else if (flag == "--year")      { year           = value; }
		else if (flag == "--max_price") { max_price      = value; }
		else if (flag == "--min_price") { min_price      = value; }
		else if (flag == "--source")    { source         = value; }
		else { printf("Unknown argument: %s\n", flag.c_str()); exit(EXIT_FAILURE); }
	}

	string http_result = APIrequest(creds_filename, email, key, since, make, model, serial, year, max_price, min_price, source);
	printf("%s\n", http_result.c_str());
	return 0;
}