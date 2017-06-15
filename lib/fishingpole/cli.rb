#our CLI controller
#require 'pry'
#require 'Nokogiri'
class Fishingpole::CLI

  def call
    puts <<~HEREDOC
    ____________________________________________________________________
    Hello, Welcome to
    Gulf Coast Fishing Resort Listings
    ____________________________________________________________________
    HEREDOC
    menu
  end

  def menu
        Fishingpole::Scraper.scrape_target
        self.class.titles
  end

  def self.titles
      puts "enter '1 or 2' for listings or '3' to Exit Program"
      input = gets.to_i
      if input == 1
        range =  Fishingpole::Poles.all[0..6]
      elsif input == 2
        range = Fishingpole::Poles.all[7..15]
      end
      results2 = range
      if input == 1
        puts "which Resort Location would you like?"
          results2.each.with_index(1) do |title, index|
            puts "#{index}.#{title.location}"
        end
      elsif input == 2
        puts "which location would you like?"
          results2.each.with_index(1) do |title, index|
            puts "#{index}.#{title.location}"
        end
      elsif input == 3
      self.goodbye
      end 
      self.search
  end

  def self.search
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
     results = Fishingpole::Poles.all.select {|x| x.location == location} #????
     results.each do |location|
        puts "----------------------------------------------------------------------"
        puts "Name: #{location.name}"
        puts "Description:#{location.description}"
        puts "Profile_url:#{location.profile_url}"
        puts "Price:#{location.resort_price}"
        puts "----------------------------------------------------------------------"
      end
      self.titles
  end

  def self.goodbye
    puts "see you tomorrow for more fishingpole resort deals"
    Kernel.exit
  end
end
  # Your code goes here...

  #Homework
  #1. Move the search method over to CLI

  #2. Give the user the ability to continue using the app rather than just closing after 1 selection

  #3. Build a separate Scraper class to do the scraping and update the code to still work
