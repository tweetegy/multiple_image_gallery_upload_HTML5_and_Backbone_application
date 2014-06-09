require "./lib/init"
require 'json'
require 'base64'

set :root, File.dirname(__FILE__) + "/../"

get "/" do
  send_file "public/index.html"
end

post "/images" do
  payload = JSON.parse(request.body.read.to_s)

  payload.each do |image|
    data = image["data"]
    i = data.index('base64') + 7
    filedata = data.slice(i, data.length)
    
    File.open(image["filename"], 'wb') do |f|
      f.write(Base64.decode64(filedata))
    end
  end

end
