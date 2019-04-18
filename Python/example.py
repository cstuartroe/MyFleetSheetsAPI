import myfleetsheets_api as mfs

listing_json = mfs.APIrequest(e = "plane_enthusiast@example.com",
                              k = "b2I-Jh_pvGVeGGJ8",
                              since = "4d",
                              max_price = 10000000,
                              year = "2012-2019",
                              make = ["beechcraft","cessna","pilatus"],
                              source = None)

headers = ["make","model","serial","registration","year"]

for header in headers:
    print(header.capitalize().ljust(25," "), end="")

print()

for listing in listing_json["results"]:
    for header in headers:
        print(str(listing.get(header,"")).ljust(25," "), end="")
    print()
