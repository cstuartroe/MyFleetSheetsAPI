<?php
$API_PARAM_FIELDS = ["since","make","model","serial","year","max_price","min_price","source"];

$API_BASE_URL = "https://api.myfleetsheets.com/api/planes/?";

# returns NULL is key is not set
# could be replaced by PHP 7's null coalescence operator '??'
function get_null($aarray, $key) {
  return isset($aarray[$key]) ? $aarray[$key] : NULL;
}

function APIrequest_raw($options) {
  $email    = get_null($options, "email");
  $key      = get_null($options, "key");
  $filename = get_null($options, "filename");

  if ($filename) {
    if ($email || $key) {
      throw new Exception("If a credentials file is provided, there is no need to provide email and API key separately");
    } elseif (file_exists($filename)) {
      $raw_creds = file_get_contents($filename);
      $creds = json_decode($raw_creds, true);
      $email = get_null($creds, "email");
      $key   = get_null($creds, "key");
      if (!$email || !$key) {
        throw new Exception("Invalid credentials file");
      }
    } else {
      throw new Exception("File not found: " . $filename);
    }
  } else {
    if (!$email || !$key) {
      throw new Exception("Please pass your email address and API key");
    }
  }

  global $API_BASE_URL;
  $url = $API_BASE_URL."email=$email&key=$key&";

  global $API_PARAM_FIELDS;
  foreach ($API_PARAM_FIELDS as $field) {
    $value = get_null($options, $field);
    if ($value) {
      if (gettype($value) == "array") {
        $value = join(",",$value);
      }
      $url .= "$field=$value&";
    }
  }

  $response = file_get_contents($url);
  return $response;
}

function APIrequest($options) {
  return json_decode(APIrequest_raw($options), true);
}

$HELP_STRING = "Usage: myfleetsheets_api.php [options]
    -f, --filename=[filename]        credentials JSON file
    -e, --email=[email]              your email address
    -k, --key=[key]                  your API key
        --since=[delta]              a time expression representing how far in the past to look, e.g., 6h, 7d, 2w
        --make=[make1,make2,...]     a make, or comma separated list of makes
        --model=[model1,model2,...]  a model, or comma-separated list of models
        --serial=[sn1,sn2,...]       a serial, or comma-separated list of serials
        --year=[year1-year2]         a year, a comma-separated list of years, or a range of years
        --max_price=[price]          the maximum asking price
        --min_price=[price]          the minimum asking price; setting min_price excludes planes with unknown or non-numeric prices
        --source=[src1,src2,...]     a source, or comma-separated list of sources
";

function parse_args() {
  $shortopts = "f::e::k::";
  $longopts = array (
    "help",
    "filename::",
    "email::",
    "key::",
    "since::",
    "make::",
    "model::",
    "serial::",
    "year::",
    "max_price::",
    "min_price::",
    "source::"
  );
  $args = getopt($shortopts, $longopts);

  if (isset($args["help"])) {
    global $HELP_STRING;
    die($HELP_STRING);
  }

  $options = [];
  $options["filename"] = get_null($args,"f") ? get_null($args,"f") : get_null($args, "filename");
  $options["email"]    = get_null($args,"e") ? get_null($args,"e") : get_null($args, "email");
  $options["key"]      = get_null($args,"k") ? get_null($args,"k") : get_null($args, "key");

  global $API_PARAM_FIELDS;
  foreach ($API_PARAM_FIELDS as $field) {
    $options[$field] = get_null($args, $field);
  }

  return $options;
}

if (!debug_backtrace()) {
  try {
    $options = parse_args();
    $raw_response = APIrequest_raw($options);
    echo $raw_response;
  } catch (Exception $e) {
    echo $e->getMessage() . "\n";
  }
}
?>
