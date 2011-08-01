namespace :scrape do

  desc 'scrape allhomes.com.au'
  task :all_homes => :environment do
    puts "processing AllHomes[#{Rails.env}]"
    AllHomesReader::Reader.scrape!
  end

end