class MazeUserSerializer < ActiveModel::Serializer
  attributes :id, :finished_time, :players_current_row, :players_current_col
  belongs_to :maze
  belongs_to :user


  # def hay_patches
  #   object.maze.hay_patches
  # end

  def hi
    "abc"
  end
end
