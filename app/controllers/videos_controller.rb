class VideosController < ApplicationController
  def index
    @product = Product.find(params[:product_id])
    @videos = @product.share_videos.all
  end

  def new
    @product = Product.find(params[:product_id])
    @video = @product.share_videos.new
  end

  def create
    @product = Product.find(params[:product_id])
    @video = @product.share_videos.new(new_params)
    if @video.save
      render json: { message: "success" }, :status => 200
    else
      render json: { error: @video.errors.full_messages.join(',')}, :status => 400
    end
  end

  def edit
    @product = Product.find(params[:product_id])
    @video = ShareVideo.find(params[:id])
  end

  def update
    @product = Product.find(params[:product_id])
    @video = ShareVideo.find(params[:id])
    if @video.update_attributes(new_params)
      redirect_to product_videos_path(@product)
    end
  end

  def destroy
    @product = Product.find(params[:product_id])
    @video = ShareVideo.find(params[:id])
    @videos = @product.share_videos.all
    @video.destroy
    respond_format
  end

  def video_destroy
    @product = Product.find(params[:product_id])
    if params[:video_ids].present?
      @videos = ShareVideo.find(params[:video_ids])
      for video in @videos
        video.destroy
      end
    end
    redirect_to product_videos_path(@product)
  end

  private

    def new_params
      params.require(:share_video).permit!
    end
end
