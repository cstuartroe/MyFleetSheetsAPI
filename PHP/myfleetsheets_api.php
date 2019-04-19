<?php
$API_PARAM_FIELDS = ["since","make","model","serial","year","max_price","min_price","source"];

$API_BASE_URL = "https://api.myfleetsheets.com/api/planes/?";

# returns NULL is key is not set
# could be replaced by PHP 7's null coalescence operator '??'
function get_null($aarray, $key) {
  return isset($aarray[$key]) ? $aarray[$key] : NULL;
}

function APIrequest($options) {
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
  echo "$response\n";
}

try {
  APIrequest(["filename" => "../credentials.json",
              "year" => 2012, "since" => "1d"]);
} catch (Exception $e) {
  echo $e->getMessage() . "\n";
}
?>
