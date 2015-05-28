class Cart < ActiveRecord::Base
  has_many :line_items
  
  def total_price
    line_items.to_a.sum{|a| a.full_price}
  end
  
  def cart_details
    line_items.each_with_index do |item, index|
      "amount_#{index+1}: #{item.full_price}<br />,
        item_name_#{index+1}: #{item.product.title}<br />,
        item_number_#{index+1}: #{item.id}<br />,
        quantity_#{index+1}: #{item.quantity}".html_safe
    end
  end
end
