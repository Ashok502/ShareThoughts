class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.integer :user_id
      t.string :title
      t.text :description
      t.decimal :price
      t.integer :quantity
      t.integer :category_id
      t.timestamps
    end
  end
end
