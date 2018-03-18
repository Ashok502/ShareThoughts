class HomeController < ApplicationController
  def index
    @products = Product.paginate :page => params[:product_page], :per_page => 6
    @videos   = Video.paginate :page => params[:video_page], :per_page => 6
    @banners = Banner.all
  end

  def about_us

  end

  def contact_us

  end

  def services

  end

  def setting
    @user = User.find(params[:id])
  end

  def update_setting
    @user = User.find(params[:id])    
    if @user.update_attributes(new_params)
      flash[:success] = "Successfully updated the user details"
      redirect_to setting_path
    else
      flash[:error] = "Failed to update the user details"
      render :action => 'setting'
    end
  end

  def change_password
    @user = current_user
    @user.errors.add(:password, "Is required") if new_params.nil? or params[:user][:password].to_s.blank?
    if @user.errors.empty? and @user.update_with_password(new_params)
      sign_in(:user, @user ,:bypass => true)
      respond_format
    end
  end

  private
  def new_params
    params.require(:user).permit!
  end
end
