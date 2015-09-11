class Cart < ActiveRecord::Base
  has_many :line_items
  before_create :cart_number?

  def total_price
    line_items.to_a.sum{|a| a.full_price}
  end

  def cart_details
    line_items.each_with_index do |item, index|
      [{ "amount_#{index+1}" => item.unit_price,
          "item_name_#{index+1}" => item.product.title,
          "item_number_#{index+1}" => item.id,
          "quantity_#{index+1}" => item.quantity}]
    end
  end

  def cart_number?
    numbers = (0..9).to_a
    pn= 'CART' + '-' + numbers[rand(10)].to_s+numbers[rand(10)].to_s+numbers[rand(10)].to_s+numbers[rand(10)].to_s
    self.cart_id = pn
  end
end
