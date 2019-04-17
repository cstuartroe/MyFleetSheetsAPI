import json
import sys
import argparse
from urllib import request as ur
from urllib import parse as up
import ssl

parser = argparse.ArgumentParser()
parser.add_argument('-f', metavar="file", type=str, nargs = "?",
                    help = "credentials JSON file")
parser.add_argument('-e', metavar="email", type=str, nargs = "?",
                    help = "your email address")
parser.add_argument('-k', metavar="file", type=str, nargs = "?",
                    help = "your API key")
parser.add_argument('--since', metavar="delta", type=str, nargs = "?",
                    help = "a time expression representing how far in the past to look, e.g., 6h, 7d, 2w")
parser.add_argument('--make', metavar="make1,make2,...", type=str, nargs = "?",
                    help = "a make, or comma separated list of makes")
parser.add_argument('--model', metavar="model1,model2,...", type=str, nargs = "?",
                    help = "a model, or comma-separated list of models")
parser.add_argument('--serial', metavar="serial1,serial2,...", type=str, nargs = "?",
                    help = "a serial, or comma-separated list of serials")
parser.add_argument('--year', metavar="year1-year2", type=str, nargs = "?",
                    help = "a year, a comma-separated list of years, or a range of years")
parser.add_argument('--max_price', metavar="price", type=str, nargs = "?",
                    help = "the maximum asking price")
parser.add_argument('--min_price', metavar="price", type=str, nargs = "?",
                    help = "the minimum asking price; setting min_price excludes planes with unknown or non-numeric prices")
parser.add_argument('--source', metavar="source1,source2,...", type=str, nargs = "?",
                    help = "a source, or comma-separated list of sources")

API_PARAM_FIELDS = ["since","make","model","serial","year","max_price","min_price","source"]

API_BASE_URL = "https://api.myfleetsheets.com/api/planes/?"


def APIrequest(**kwargs):
    if kwargs.get("f"):
        if kwargs.get("e") or kwargs.get("k"):
            raise ValueError("If a credentials file is provided, there is no need to provide email and API key separately")
            
        try:
            with open(kwargs["f"],"r",encoding="utf-8") as fh:
                creds = json.load(fh)
        except FileNotFoundError:
            raise ValueError("File not found: " + kwargs["f"])
            
        try:
            email = creds["email"]
            key = creds["key"]
        except:
            raise ValueError("Invalid credentials file")

    else:
        if not (kwargs.get("e") and kwargs.get("k")):
            raise ValueError("Please pass your email address and API key")

        email = kwargs["e"]
        key = kwargs["k"]

    url = API_BASE_URL + "email=%s&key=%s&" % (email, key) 

    for kw, arg in kwargs.items():
        if kw in API_PARAM_FIELDS and arg is not None:
            if type(arg) is list:
                arg = ",".join(map(lambda x: str(x), arg))
                
            url += "%s=%s&" % (kw, up.quote(str(arg)))

    response = ur.urlopen(url)

    raw_json = response.read()

    try:
        return json.loads(raw_json)
    except json.decoder.JSONDecodeError as e:
        raise ValueError(raw_json)

if __name__ == "__main__":
    kwargs = vars(parser.parse_args())

    try:
        listing_json = APIrequest(**kwargs)
    except ValueError as e:
        print(e)
        sys.exit()

    formatted_json = json.dumps(listing_json, indent=4, sort_keys = True)
    print(formatted_json)
