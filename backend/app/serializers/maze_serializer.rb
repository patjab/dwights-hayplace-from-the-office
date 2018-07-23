class MazeSerializer < ActiveModel::Serializer
  attributes :id, :size, :difficulty, :image_url, :maze_finish_row, :maze_finish_col, :initial_row, :initial_col
  has_many :hay_patches
  has_many :characters
end
