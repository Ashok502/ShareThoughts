class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :user_id
      t.integer :receiver_id
      t.string :subject
      t.boolean :is_delete, :default => false
      t.boolean :is_read, :default => false
      t.attachment :document
      t.text :body
      t.timestamps
    end
  end
end
