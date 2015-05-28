class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer :user_id
      t.integer :cart_id
      t.string  :ip_address
      t.string  :first_name
      t.string  :last_name
      t.string  :card_type
      t.date    :card_expires_on
      t.string  :action
      t.decimal :amount
      t.boolean :success
      t.string  :authorization
      t.string  :message
      t.text    :params
      t.string  :address
      t.string  :state
      t.string  :city
      t.string  :zip
      t.string  :phone
      t.string  :payment_type
      t.string :express_token
      t.string :express_payer_id
      t.timestamps
    end
  end
end
