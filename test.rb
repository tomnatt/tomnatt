puts 'foo'
puts ENV['HOSTING_USER']
puts ENV['TOMNATT_HOSTING_DIR']
puts ENV['DEPLOY_TARGET']

hu = ENV['HOSTING_USER']

if hu == 'tom'
  puts 'yes'
else
  puts 'no'
end
