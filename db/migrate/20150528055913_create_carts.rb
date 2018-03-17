class CreateCarts < ActiveRecord::Migration
  def change
    create_table :carts do |t|
      t.date :purchased_at
      t.string :cart_id
      t.timestamps
    end
  end
end
