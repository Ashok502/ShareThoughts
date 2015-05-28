class CartsController < ApplicationController
  def index
    @cart = current_cart
    @items = @cart.line_items
  end
end
