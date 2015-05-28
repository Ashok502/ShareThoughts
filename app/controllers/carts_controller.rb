class CartsController < ApplicationController
  def index
    @cart = current_cart
    @items = @cart.line_items
  end
  def destroy
    @item = LineItem.find(params[:id])
    @item.destroy
    respond_format
  end
end
