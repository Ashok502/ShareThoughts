class CartsController < ApplicationController
  skip_before_filter :verify_authenticity_token
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

  def payu_return
    notification = PayuIndia::Notification.new(request.query_string, options = {:key => ENV['PKEY'], :salt => ENV['PSALT'], :params => params})
    @cart = Cart.find_by_cart_id(notification.invoice) # notification.invoice is order id/cart id which you have submited from payment direction page.
    if notification.complete?
      @order = Order.new(:user_id => current_user.id, :cart_id => @cart.id, :amount => notification.gross, :payment_type => params['payment_source'], :card_type => params['card_type'], :first_name => params['name_on_card'], :last_name => params['name_on_card'], :params => params, :success => true, :authorization => params['mihpayid'], :card_expires_on => "2020-09-01")
      @order.save(:validate => false)
      for item in @cart.line_items
        item.product.update_attribute(:quantity, item.product.quantity - item.quantity)
      end
      @cart.update_attribute(:purchased_at, Date.today)
      session[:cart] = nil
      redirect_to orders_path
    else
      redirect_to root_path
    end
  end

  private

  def user_params
    params.require(:line_item).permit!
  end
end
