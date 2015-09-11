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
      render json: { message: "success" }, :status => 200
    else
      render json: { error: @image.errors.full_messages.join(',')}, :status => 400
    end
  end

  def edit
    @product = Product.find(params[:product_id])
    @image = Image.find(params[:id])
  end

  def update
    @product = Product.find(params[:product_id])
    @image = Image.find(params[:id])
    if @image.update_attributes(new_params)
      redirect_to product_images_path(@product)
    end
  end

  def destroy
    @product = Product.find(params[:product_id])
    @image = Image.find(params[:id])
    @images = @product.images.all
    @image.destroy
    respond_format
  end

  def image_destroy
    @product = Product.find(params[:product_id])
    if params[:image_ids].present?
      @images = Image.find(params[:image_ids])
      for image in @images
        image.destroy
      end
    end
    redirect_to product_images_path(@product)
  end

  private

    def new_params
      params.require(:image).permit!
    end
end
