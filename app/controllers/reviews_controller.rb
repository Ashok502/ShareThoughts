class ReviewsController < ApplicationController
  def create
  	@product = Product.find(params[:product_id])
    @reviews = @product.reviews
  	@review = @product.reviews.new(review_params.merge(product_id: @product.id, user_id: current_user.id))
  	if @review.save
  	  respond_format
  	end
  end

  private
  def review_params
  	params.require(:review).permit!
  end
end
