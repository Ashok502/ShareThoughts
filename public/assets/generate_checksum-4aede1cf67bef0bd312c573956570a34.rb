#!C:\Ruby21-x64\bin\ruby.exe
require '/paytm/encryption_new_pg.rb'
require 'cgi'
require 'uri'
cgi = CGI.new
params = cgi.params
include EncryptionNewPG
  
PAYTM_MERCHANT_KEY = "IITIAN94490226667854"
WEBSITE = "https://pguat.paytm.com/oltp-web/processTransaction?orderid=%3COrder_ID"
MID = "5cjAqbssNYunuMjV"
INDUSTRY_TYPE_ID = "Retail"
CHANNEL_ID = "WEB"

paramList = Hash.new

ORDER_ID = params["ORDER_ID"]
CUST_ID = params["CUST_ID"]
TXN_AMOUNT = params["TXN_AMOUNT"]
MOBILE_NO = params["MOBILE_NO"]
EMAIL = params["EMAIL"]

paramList["MID"] = MID
paramList["ORDER_ID"] = ORDER_ID
paramList["CUST_ID"] = CUST_ID
paramList["INDUSTRY_TYPE_ID"] = INDUSTRY_TYPE_ID
paramList["CHANNEL_ID"] = CHANNEL_ID
paramList["TXN_AMOUNT"] = TXN_AMOUNT
paramList["MSISDN"] = MOBILE_NO
paramList["EMAIL"] = EMAIL
paramList["WEBSITE"] = WEBSITE

checksum_hash = new_pg_checksum(paramList, PAYTM_MERCHANT_KEY).gsub("\n",'')

#staging Url
payment_url = "https://pguat.paytm.com/oltp-web/processTransaction";

#live Url 
#payment_url = "https://secure.paytm.in/oltp-web/processTransaction";

puts "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html;charset=ISO-8859-I\"><title>Paytm</title></head><body>Redirect back to the app<br><center><h1>Please do not refresh this page...</h1></center><form method=\"post\" action=\"#{payment_url}\" name=\"f1\">"
keys = paramList.keys
keys.each do |k|
	puts "<input type=\"hidden\" name=\"#{k}\" value=\"#{paramList[k]}\">"
end
puts "<input type=\"hidden\" name=\"CHECKSUMHASH\" value=\"#{checksum_hash}\"></form><script type=\"text/javascript\">document.f1.submit();</script></body></html>"