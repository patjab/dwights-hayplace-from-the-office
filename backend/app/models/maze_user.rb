class MazeUser < ApplicationRecord
  before_create :bananas
  belongs_to :user
  belongs_to :maze

  def bananas
    self.players_current_row = maze.initial_row
    self.players_current_col = maze.initial_col
  end
end
