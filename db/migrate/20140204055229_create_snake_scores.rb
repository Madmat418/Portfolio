class CreateSnakeScores < ActiveRecord::Migration
  def change
    create_table :snake_scores do |t|
      t.integer :score, :null => false
	  t.string :name, :null => false
      t.timestamps
    end
  end
end
