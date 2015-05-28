class CreateCarts < ActiveRecord::Migration
  def change
    create_table :carts do |t|
      t.date :purchased_at
      t.timestamps
    end
  end
end
