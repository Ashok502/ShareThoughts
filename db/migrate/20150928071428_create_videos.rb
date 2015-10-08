class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.attachment :video
      t.string :videoable_type
      t.integer :videoable_id
      t.timestamps
    end
  end
end
