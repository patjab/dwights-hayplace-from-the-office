class CreateMazeUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :maze_users do |t|
      t.integer :user_id
      t.integer :maze_id
      t.integer :finished_time
      t.integer :players_current_row
      t.integer :players_current_col

      t.timestamps
    end
  end
end
