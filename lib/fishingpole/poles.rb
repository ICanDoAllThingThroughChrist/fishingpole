
class Fishingpole::Poles
  @@allitem = []
  @@allprice = []
  @@all = []
  attr_accessor :name, :location, :profile_url, :description, :resort_feature, :id
    def initialize(hash)
      hash.each do |key, value|
        self.send("#{key}=", value)
      end
      @@all << self
      #binding.pry
    end

    def self.all
      #print @@all
      #return @@all
      #puts "#{@@all}"
      @@all
      #binding.pry
    end

    def self.scrape_target
      html = open('http://www.resortsandlodges.com/resort-type/fishing-resorts/usa/texas/gulf-coast.html')
      doc = Nokogiri::HTML(html)
      scraped_resorts = doc.css('.row .ral-listing')
      scraped_resorts.each do |resort|
          self.new({
          #id: @id
          name: resort.css('.listing-head a').text.split(" ")[0..5].join(" "),
          location: resort.css('.location').text.split(" ")[0..5].join(""),
          profile_url: resort.css('a').attr('href').value,
          description: resort.css('p , .listing-body a').text,
          resort_feature: resort.css('span , li').text
          })
          #binding.pry
        end
    end

    def self.titles
      # self.scrape_target
      puts "enter '1 to 5' consequtively for listings"
      input = gets.to_i
      self.all
      if input == 1
        counter = 0
        while counter < 1
          self.all[0..9].each do |title|
            title_detail = [
             "Resort Name",
             "Resort Location",
             "URL",
             "Description",
             "Features"
            ]
            #puts "#{self.all[index]}"
            puts "_____________________________________________________"
            title.instance_variables.each_with_index do |var, index|
              puts "#{title_detail[index]}: #{title.instance_variable_get(var)}"
            end
            puts "_____________________________________________________"
          end
          counter = counter + 1
        end
      elsif input == 2
        counter = 0
        while counter < 1
          self.all[10..19].each do |title|
            title_detail = [
             "Resort Name",
             "Resort Location",
             "URL",
             "Description",
             "Features"
            ]
            #puts "#{self.all[index]}"
            puts "_____________________________________________________"
            title.instance_variables.each_with_index do |var, index|
              puts "#{title_detail[index]}: #{title.instance_variable_get(var)}"
            end
            puts "_____________________________________________________"
          end
          counter = counter + 1
        end
      elsif input == 3#problem starts here re: failure to issue puts
        counter = 0
        while counter < 1
          self.all[20..29].each do |title|
            title_detail = [
             "Resort Name",
             "Resort Location",
             "URL",
             "Description",
             "Features"
            ]
            #puts "#{self.all[index]}"
            puts "_____________________________________________________"
            title.instance_variables.each_with_index do |var, index|
              puts "#{title_detail[index]}: #{title.instance_variable_get(var)}"
            end
            puts "_____________________________________________________"
          end
          counter = counter + 1
        end
      elsif input == 4
        counter = 0
        while counter < 1
          self.all[30..39].each do |title|
            title_detail = [
             "Resort Name",
             "Resort Location",
             "URL",
             "Description",
             "Features"
            ]
            #puts "#{self.all[index]}"
            puts "_____________________________________________________"
            title.instance_variables.each_with_index do |var, index|
              puts "#{title_detail[index]}: #{title.instance_variable_get(var)}"
            end
            puts "_____________________________________________________"
          end
          counter = counter + 1
        end
      elsif input == 5
        counter = 0
        while counter < 1
          self.all[40..49].each do |title|
            title_detail = [
             "Resort Name",
             "Resort Location",
             "URL",
             "Description",
             "Features"
            ]
            #puts "#{self.all[index]}"
            puts "_____________________________________________________"
            title.instance_variables.each_with_index do |var, index|
              puts "#{title_detail[index]}: #{title.instance_variable_get(var)}"
            end
            puts "_____________________________________________________"
          end
          counter = counter + 1
        end
      elsif input == 6
        puts "exiting the program"
        exit
      else
        puts "try again"
      end
      self.search
    end
    def self.search
      puts "which location would you like?
      1 for Port Aransas,
      2 for South Padre
      3 for Galveston,
      4 for Montgomery
      5 for Fulton,
      6 for LeagueCity
      7 for CorpusChristi,
      8 for Waller,
      9 for Rockport"
      user_input = gets.strip
      if user_input == "1"
        location = "PortAransas,Texas,UnitedStates"
      elsif user_input == "2"
        location = "SouthPadreIsland,Texas,UnitedStates"
      elsif user_input == "3"
        location = "Galveston,Texas,UnitedStates"
      elsif user_input == "4"
        location = "Montgomery,Texas,UnitedStates"
      elsif user_input == "5"
        location = "Fulton,Texas,UnitedStates"
      elsif user_input == "6"
        location = "LeagueCity,Texas,UnitedStates"
      elsif user_input == "7"
        location = "CorpusChristi,Texas,UnitedStates"
      elsif user_input == "8"
        location = "Waller,Texas,UnitedStates"
      elsif user_input == "9"
        location = "Rockport,Texas,UnitedStates"
      end

     results = self.all.select {|x| x.location == location} #????
      results.each do |location|
        puts "Name: #{location.name}"
        puts "Description: #{location.description}"
        puts "Profile_url: #{location.profile_url}"
        puts "---------------------------------------------"
      end

    end
#=>   a, dog, cat
end
