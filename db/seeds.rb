# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(:email => 'ashok@gmail.com', :password => '12345678', :password_confirmation => '12345678', :username => 'Ashok',:confirmation_token => nil,:confirmed_at => Time.now)
User.create(:email => 'sunil@gmail.com', :password => '12345678', :password_confirmation => '12345678', :username => 'Sunil',:confirmation_token => nil,:confirmed_at => Time.now)
User.create(:email => 'kapil@gmail.com', :password => '12345678', :password_confirmation => '12345678', :username => 'Kapil',:confirmation_token => nil,:confirmed_at => Time.now)
