class CreateHayPatches < ActiveRecord::Migration[5.2]
  def change
    create_table :hay_patches do |t|
      t.integer :current_coordinate_row
      t.integer :current_coordinate_col
      t.integer :maze_id

      t.timestamps
    end
  end
end
