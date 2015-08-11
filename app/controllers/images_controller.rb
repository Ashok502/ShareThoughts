class ImagesController < ApplicationController

  def index
    @product = Product.find(params[:product_id])
    @images = @product.images.all
  end

  def new
    @product = Product.find(params[:product_id])
    @image = @product.images.new
  end

  def create
    @product = Product.find(params[:product_id])
    @image = @product.images.new(new_params)
    if @image.save
      respond_to do |format|
        format.html {
          render :json => [@image.to_file_upload].to_json,
          :content_type => "text/html",
          :layout => false
        }
        format.json {
          render :json => [@image.to_file_upload].to_json
        }
      end
    end
  end

  def destroy
    @product = Product.find(params[:product_id])
    @image = Image.find(params[:id])
    @image.destroy
    redirect_to product_images_path(@product)
  end

  private

    def new_params
      params.require(:image).permit!
    end
end
