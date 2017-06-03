#our CLI controller
#require 'pry'
#require 'Nokogiri'
class Fishingpole::CLI

  def call
    puts <<~HEREDOC
    ________________________________
    Hello, Welcome to
    Gulf Coast Fishing Resort Listings
    _________________________________
    HEREDOC
    menu
    #list location
    goodbye
  end

  def menu
        Fishingpole::Poles.scrape_target
        Fishingpole::Poles.titles
  end

  def goodbye
    puts "see you tomorrow for more fishingpole deals"
  end
end
  # Your code goes here...
