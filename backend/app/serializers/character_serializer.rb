class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :current_coordinate_row, :current_coordinate_col, :maze_id
end
