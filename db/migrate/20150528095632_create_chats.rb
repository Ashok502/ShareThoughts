class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.text :body
      t.references :conversation, index: true
      t.references :user, index: true
      t.timestamps
    end
  end
end
