class BannersController < ApplicationController
  def new
    @banner = Banner.new
    1.times {@banner.images.build}
  end
  
  def create
    @banner = Banner.new(new_params)
    1.times {@banner.images.build} if @banner.images.blank?
    if @banner.save
      redirect_to '/'
    else
      render :action => 'new'
    end
  end
  
  private
  def new_params
    params.require(:banner).permit!
  end
end
