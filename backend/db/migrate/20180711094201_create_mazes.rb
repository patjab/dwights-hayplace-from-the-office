class CreateMazes < ActiveRecord::Migration[5.2]
  def change
    create_table :mazes do |t|
      t.integer :size
      t.string :difficulty
      t.integer :maze_finish_row
      t.integer :maze_finish_col
      t.integer :initial_row
      t.integer :initial_col
      t.timestamps
    end
  end
end
