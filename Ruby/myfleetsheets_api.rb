require 'pathname'
require 'json'
require 'net/http'
require 'optparse'

API_PARAM_FIELDS = ["since","make","model","serial","year","max_price","min_price","source"]

API_BASE_URL = "https://api.myfleetsheets.com/api/planes/?"

# this is just a remake of Rails' .empty? method
def is_blank(x)
  if x.nil?
    return true
  elsif (x.class == Array || x.class == String) && x.empty?
    return true
  else
    return false
  end
end

def APIrequest_raw(options)
  email    = options.fetch("email", nil)
  key      = options.fetch("key", nil)
  filename = options.fetch("filename", nil)

  if is_blank(filename)
    if is_blank(email) || is_blank(key)
      raise ArgumentError, "Please pass your email address and API key"
    end

  else
    pn = Pathname.new filename
    if !(is_blank(email) && is_blank(key))
      raise ArgumentError, "If a credentials file is provided, there is no need to provide email and API key separately"
    elsif pn.exist?
      raw_creds = pn.read
      creds = JSON.parse(raw_creds)
      email = creds.fetch("email", nil)
      key   = creds.fetch("key",nil)
      if is_blank(email) || is_blank(key)
        raise ArgumentError, "Invalid credentials file"
      end
    else
      raise ArgumentError, "File not found: " + filename
    end
  end

  url = "#{API_BASE_URL}email=#{email}&key=#{key}&"

  for field in API_PARAM_FIELDS
    if !is_blank(options.fetch(field, nil))
      value = options[field]
      if value.class == Array
        value = value.join(",")
      end
      url += "#{field}=#{value}&"
    end
  end

  response = Net::HTTP.get_response(URI(url))
  return response.body
end

def APIrequest(options)
  return JSON.parse(APIrequest_raw(options))
end

def parse_args
  options = {}
  OptionParser.new do |opts|
    opts.banner = "Usage: myfleetsheets_api.rb [options]"

    opts.on("-f", "--filename [filename]", "credentials JSON file") do |v|
      options["filename"] = v
    end
    opts.on("-e", "--email [email]", "your email address") do |v|
      options["email"] = v
    end
    opts.on("-k", "--key [key]", "your API key") do |v|
      options["key"] = v
    end
    opts.on("--since [delta]", "a time expression representing how far in the past to look, e.g., 6h, 7d, 2w") do |v|
      options["since"] = v
    end
    opts.on("--make [make1,make2,...]", "a make, or comma separated list of makes") do |v|
      options["make"] = v
    end
    opts.on("--model [model1,model2,...]", "a model, or comma-separated list of models") do |v|
      options["model"] = v
    end
    opts.on("--serial [sn1,sn2,...]", "a serial, or comma-separated list of serials") do |v|
      options["serial"] = v
    end
    opts.on("--year [year1-year2]", "a year, a comma-separated list of years, or a range of years") do |v|
      options["year"] = v
    end
    opts.on("--max_price [price]", "the maximum asking price") do |v|
      options["max_price"] = v
    end
    opts.on("--min_price [price]", "the minimum asking price; setting min_price excludes planes with unknown or non-numeric prices") do |v|
      options["min_price"] = v
    end
    opts.on("--source [src1,src2,...]", "a source, or comma-separated list of sources") do |v|
      options["source"] = v
    end
  end.parse!
  return options
end

if __FILE__ == $0
  puts APIrequest_raw(parse_args)
end
