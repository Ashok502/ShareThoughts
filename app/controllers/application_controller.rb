class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include ApplicationHelper
  helper :all
  helper_method :current_cart
  before_action :configure_permitted_parameters, if: :devise_controller?
  
    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email,:password, :password_confirmation,:username) }
    end
  
    def is_login?
      unless current_user
        flash[:error] = "Please Login!!"
        redirect_to '/'
      end
    end
    
    def current_cart(create_if_not_exist=false)
      cart = Cart.find(session[:cart]) if session[:cart]
      unless cart
        if create_if_not_exist
          cart = Cart.create
        else
          cart = Cart.new
        end
      end
      cart
    end
  
    protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) {|u| u.permit!}
    end
  end
