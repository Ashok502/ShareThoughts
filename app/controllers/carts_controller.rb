class CartsController < ApplicationController
  def index
    @cart = current_cart
    @items = @cart.line_items
  end
  def destroy
    @item = LineItem.find(params[:id])
    @success = "<span id='success' style='color: green;'>item successfully deleted from the Cart!</span>".html_safe
    @item.destroy
    respond_format
  end
end
