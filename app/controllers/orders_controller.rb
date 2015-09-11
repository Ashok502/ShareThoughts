class OrdersController < ApplicationController
  before_filter :is_login?
  def express
    response = EXPRESS.setup_purchase(current_cart.total_price * 100,
      :ip => request.remote_ip,
      :return_url => new_order_url,
      :cancel_return_url => root_url,
      :allow_note => true,
      :items => current_cart.cart_details
    )
    redirect_to EXPRESS.redirect_url_for(response.token)
  end

  def new
    @order = Order.new(:express_token => params[:token])
  end

  def create
    @cart = current_cart
    @order = Order.new(params_order.merge(user_id: current_user.id, cart_id: @cart.id))
    if @order.purchase && @order.success == true
      for item in @cart.line_items
        item.product.update_attribute(:quantity, item.product.quantity - item.quantity)
      end
      @cart.update_attribute(:purchased_at, Date.today)
      session[:cart] = nil
      redirect_to orders_path
    else
      render :action => "new"
    end
  end

  def index
    @orders = current_user.orders.where("success = true")
  end

  def destroy
    @order = Order.find(params[:id])
    @order.destroy
    redirect_to orders_path
  end

  private
  def params_order
    params.require(:order).permit!
  end
end
