class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.attachment :video
      t.integer :user_id
      t.string :name
      t.text :description
      t.decimal :price
      t.timestamps
    end
  end
end
