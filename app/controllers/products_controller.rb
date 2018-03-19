class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy, :add_to_cart]
  before_filter :is_login?, :except => [:add_to_cart]
  respond_to :html

  def index
    @products = Product.where(user_id: current_user.id).paginate :page => params[:product_page], :per_page => 6
    respond_with(@products)
  end

  def show
    @product = Product.find(params[:id])
    @review = @product.reviews.new
    @reviews = @product.reviews
  end

  def new
    @product = Product.new
    1.times {@product.images.build}
    respond_with(@product)
  end
  
  def add_to_cart
    @cart = current_cart
    @cart.update_attribute(:created_at, Time.now)
    session[:cart] = @cart.id
    @cart_error = "<span id='success' style='color: red;'>Sorry we are currently out of stock.</span>".html_safe
    @cart_success = "<span id='success' style='color: green;'>item successfully added to the Cart!</span>".html_safe
    @lineitem = LineItem.find_by_cart_id_and_product_id(@cart.id,@product.id)
    if !@lineitem.present?
      @success = @cart_success
      LineItem.create(:product_id => @product.id, :quantity => 1, :unit_price => @product.price, :cart_id => @cart.id)
    else
      if @lineitem.quantity < @product.quantity
        @success = @cart_success
        @lineitem.update_attribute(:quantity, @lineitem.quantity + 1)
      else
        @success = @cart_error
      end
    end
    respond_format
  end

  def edit
  end

  def create
    @product = Product.new(product_params.merge(user_id: current_user.id))
    1.times{@product.images.build} if @product.images.blank?
    if @product.save
      respond_with(@product)
    else
      render :action => 'new'
    end
  end

  def update
    if @product.update(product_params)
      respond_with(@product)
    else
      render :action => 'edit'
    end
  end

  def destroy
    @product.destroy
    respond_with(@product)
  end

  private
  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit!
  end
end
