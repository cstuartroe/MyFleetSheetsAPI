<?php
require './myfleetsheets_api.php';

$options = ["email" => "plane_enthusiast@example.com", "key" => "b2I-Jh_pvGVeGGJ8",
           "since" => "4d", "max_price" => 10000000, "year" => "2012-2019",
           "make" => ["beechcraft","cessna","pilatus"], "source" => NULL];

$listing_json = APIrequest($options);

$headers = ["make","model","serial","registration","year"];

foreach($headers as $header) {
  echo str_pad(ucfirst($header), 25, " ");
}
echo "\n";

foreach($listing_json["results"] as $listing) {
  foreach($headers as $header) {
    echo str_pad(get_null($listing, $header), 25, " ");
  }
  echo "\n";
}
?>
