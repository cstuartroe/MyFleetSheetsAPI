require './myfleetsheets_api.rb'

options = {"email" => "plane_enthusiast@example.com", "key" => "b2I-Jh_pvGVeGGJ8",
           "since" => "4d", "max_price" => 10000000, "year" => "2012-2019",
           "make" => ["beechcraft","cessna","pilatus"], "source" => nil}

listing_json = APIrequest(options)

headers = ["make","model","serial","registration","year"]

for header in headers
  print header.capitalize.ljust(25)
end
puts

for listing in listing_json["results"]
  for header in headers
    print String(listing.fetch(header,"")).ljust(25)
  end
  puts
end
