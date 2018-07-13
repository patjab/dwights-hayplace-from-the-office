class Maze < ApplicationRecord
  has_many :maze_users
  has_many :characters
  has_many :hay_patches
end
