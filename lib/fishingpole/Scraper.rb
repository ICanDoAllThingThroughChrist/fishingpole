class Fishingpole::Scraper

	def self.scrape_target
      html ="http://www.resortsandlodges.com/resort-type/fishing-resorts/usa/texas/gulf-coast.html?page=1"
      doc = Nokogiri::HTML(open(html))
      scraped_resorts = doc.css('.row .ral-listing')
      scraped_resorts.each do |resort|
          Fishingpole::Poles.new({
          name: resort.css('.listing-head a').text.split(" ")[0..5].join(" "),
          location: resort.css('.location').text.split(" ")[0..5].join(""),
          profile_url: resort.css('a').attr('href').value,
          description: resort.css('p , .listing-body a').text,
          resort_feature: resort.css('li').text,
          resort_price: resort.css('.rate-low-lodging span').text,
          phone: resort.css('.listing-phone').text.gsub(" ","").gsub("/N",""),
          rating: resort.css('.pos').text
          })
        end
    end 
end 