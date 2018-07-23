class AddImageMaze < ActiveRecord::Migration[5.2]
  def change
    add_column :mazes, :image_url, :string
  end
end
