class LineItem < ActiveRecord::Base
  belongs_to :cart
  belongs_to :product
  
  def full_price
    quantity * unit_price
  end
end
