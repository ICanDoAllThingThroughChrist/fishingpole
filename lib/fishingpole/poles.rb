class Fishingpole::Poles
  @@all = []
  attr_accessor :name, :location, :profile_url, :description, :resort_feature, :id, :resort_price, :phone, :rating
  
    def initialize(hash)
      hash.each do |key, value|
        self.send("#{key}=", value)
      end
      @@all << self
      #@location = []
    end

    def self.all
      @@all
    end


end
