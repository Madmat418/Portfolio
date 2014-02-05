json.array! @scores do |high_score|
  json.score high_score.score 
  json.name high_score.name
end