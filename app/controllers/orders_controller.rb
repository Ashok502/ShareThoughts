class OrdersController < ApplicationController
  
  def express
    response = EXPRESS_GATEWAY.setup_purchase(current_cart.total_price * 100,
      :ip => request.remote_ip,
      :return_url => new_order_url,
      :cancel_return_url => root_url,
      :description => current_cart.cart_details
    )
    redirect_to EXPRESS_GATEWAY.redirect_url_for(response.token)
  end
  
  def new
    @type = params[:pay]
    @order = Order.new(:express_token => params[:token])
  end

  def create
    @cart = current_cart
    @order = Order.new(params_order.merge(user_id: current_user.id, cart_id: @cart.id))
    @type = @order.payment_type
    if @order.purchase && @order.success == true
      @cart.update_attribute(:purchased_at, Date.today)
      session[:cart] = nil
      redirect_to orders_path
    else
      render :action => "new"
    end
  end
  
  def index
    @orders = current_user.orders
  end
  
  private
  def params_order
    params.require(:order).permit!
  end
end