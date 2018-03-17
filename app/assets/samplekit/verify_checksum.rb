#!C:\Ruby21-x64\bin\ruby.exe
require './paytm/encryption_new_pg.rb'
require 'cgi'
include EncryptionNewPG

PAYTM_MERCHANT_KEY = ""

cgi = CGI.new
params = cgi.params
puts "Content-type: text/html"
puts ""
paytmparams = Hash.new

keys = params.keys
keys.each do |k|
paytmparams[k] = params[k]
end


checksum_hash = paytmparams["CHECKSUMHASH"]
paytmparams.delete("CHECKSUMHASH")
return_array = paytmparams		
		
is_valid_checksum = new_pg_verify_checksum(paytmparams, checksum_hash, PAYTM_MERCHANT_KEY)



puts "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html;charset=ISO-8859-I\"><title>Paytm</title></head><body>"

if is_valid_checksum == true
	puts "<b>Checksum matched and following are the transaction details:</b><br/>";
	if params["STATUS"] == "TXN_SUCCESS"
		puts "<b>Transaction status is success</b><br/>"
	else
		puts "<b>Transaction status is failure</b><br/>"
	end
else
puts "<b>Checksum mismatched.</b>"
end

puts "</body></html>" 