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
  def update
    @lineitem = LineItem.find(params[:id])
    @qty = params[:line_item][:quantity]
    @cart_error = "<span id='success' style='color: red;'>Sorry we are currently out of stock.</span>".html_safe
    @cart_success = "<span id='success' style='color: green;'>item successfully added to the Cart!</span>".html_safe
    if @qty.to_i <= @lineitem.product.quantity
      @success = @cart_success
      @lineitem.update_attributes(user_params)
    else
      @success = @cart_error
    end
    respond_format
  end
  
  private
  
  def user_params
    params.require(:line_item).permit!
  end
end
