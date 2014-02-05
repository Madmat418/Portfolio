class SnakeScoresController < ApplicationController
  def create
    puts 'watwat'
    @score = SnakeScore.new(params[:score])
	puts 'watwatwat'
	@score.save!
	@scores = SnakeScore.all.sort_by {|high_score| high_score.score}
	@scores.reverse!
	if @scores.length > 10
	  @scores.last.delete
	end
	render :index
  end
  
  def index
    @scores = SnakeScore.all.sort_by {|high_score| high_score.score}
	@scores.reverse!
	render :index
  end
end
