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

  def self.continuation
    puts "would you like to continue? enter 1 for 'yes' or 2 for 'no'"
    input = gets.to_i 
    if input == 1
      self.titles
    else  
      self.goodbye
    end 
  end 

  def self.titles
      puts "Select from listing below by entering its listing ID accordingly. 

      For Example, for Port Aransas, Texas, Enter '1'
      
      To Exit: Enter'10' to Exit Program
      ____________________________________________

      1.Port Aransas,Texas,United States
      2.South Padre Island,Texas, United States
      3.Galveston,Texas, United States
      4.Montgomery,Texas, United States
      5.Fulton,Texas, United States
      6.League City,Texas, United States
      7.Corpus Christi,Texas,United States
      8.Waller,Texas, United States
      9.Rockport,Texas, United States
      ___________________________________________"
      self.search
  end 
  
  def self.search
      puts "enter input"
      user_input = gets.to_i
      #binding.pry
      if user_input == 1
        location = "PortAransas,Texas,UnitedStates"
      elsif user_input == 2
        location = "SouthPadreIsland,Texas,UnitedStates"
      elsif user_input == 3
        location = "Galveston,Texas,UnitedStates"
      elsif user_input == 4
        location = "Montgomery,Texas,UnitedStates"
      elsif user_input == 5
        location = "Fulton,Texas,UnitedStates"
      elsif user_input == 6
        location = "LeagueCity,Texas,UnitedStates"
      elsif user_input == 7
        location = "CorpusChristi,Texas,UnitedStates"
      elsif user_input == 8
        location = "Waller,Texas,UnitedStates"
      elsif user_input == 9
      #binding.pry
        location = "Rockport,Texas,UnitedStates"
      elsif user_input == 10
        self.goodbye
      else
        self.titles
      end
     results = Fishingpole::Poles.all.select {|x| x.location == location} #????
     results.each do |location|
        puts "----------------------------------------------------------------------"
        puts "Name: #{location.name}"
        puts "Description:#{location.description}"
        puts "Profile_url:#{location.profile_url}"
        puts "Price:#{location.resort_price}"
        puts "Phone:#{location.phone}"
        puts "----------------------------------------------------------------------"
      end
      self.continuation
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
