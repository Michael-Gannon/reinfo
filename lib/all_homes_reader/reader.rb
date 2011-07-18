require 'open-uri'
require 'nokogiri'

class AllHomesReader::Reader
  SITE_HOST = 'http://www.allhomes.com.au'

  def scrape!
    suburbs_page = get '/ah/act/sale-residential'

    suburb_nodes = suburbs_page.xpath('//div[@class="four_column_wrapper"][1]//dd/a')
    suburb_nodes.each do |suburb|
      suburb = Suburb.find_or_create_by_name(suburb.text, :url => suburb[:href])
      properties_for suburb
    end
  end

  def properties_for suburb

    properties_page = get suburb.url
    properties = properties_page.xpath('//table[@class="recordList light"][1]//tbody/tr').collect do | property |

      address = property.at_xpath('td[1]/a').text
      price = property.at_xpath('td[2]').text.delete('$,+')
      bedrooms = property.xpath('td[3]').text
      bathrooms = property.xpath('td[4]').text.strip.first
      ensuite = property.xpath('td[4]').text.include? 'E'
      property_type = property.xpath('td[5]').text

      Property.create :address => address,
                    :suburb_id => suburb.id,
                    :price => price,
                    :bedrooms => bedrooms,
                    :bathrooms => bathrooms,
                    :ensuite => ensuite,
                    :property_type => property_type
    end
    puts "#{suburb.name}, found #{properties.size} properties"
  end

  private

  def get page
    Nokogiri::HTML(open("#{SITE_HOST}#{page}"))
  end
end