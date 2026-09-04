#!/usr/bin/env ruby

require 'json'

puts "Scanning judgments folder..."
cases = []

Dir.glob("judgments/*").each do |file|
  next unless File.file?(file)
  
  filename = File.basename(file)
  title = filename.sub(/\.(pdf|txt)$/i, '').gsub(/[-_]/, ' ')
  
  court = "SU Court"
  if filename.upcase.include?("LSS")
    court = "LSS Court"
  elsif filename.upcase.include?("CONVENTIONAL")
    court = "Conventional Court"
  end

  case_data = {
    "filename" => filename,
    "title" => title,
    "court" => court,
    "path" => file
  }
  
  if file.downcase.end_with?('.txt')
    begin
      content = File.read(file)
      # enforce UTF-8
      content = content.encode('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
      case_data["rawText"] = content
    rescue => e
      puts "Error reading #{file}: #{e.message}"
    end
  end
  
  cases << case_data
end

File.open("data/cases.js", "w") do |f|
  f.write("const CASES = ")
  f.write(JSON.pretty_generate(cases))
  f.write(";\n")
end

puts "Successfully updated data/cases.js with #{cases.length} cases."
