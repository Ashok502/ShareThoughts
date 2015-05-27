class VideosController < ApplicationController
  before_action :set_video, only: [:show, :edit, :update, :destroy]
  before_filter :is_login?
  respond_to :html

  def index
    @videos = Video.where(user_id: current_user.id).paginate :page => params[:video_page], :per_page => 6
    respond_with(@videos)
  end

  def show
    respond_with(@video)
  end

  def new
    @video = Video.new
    respond_with(@video)
  end

  def edit
  end

  def create
    @video = Video.new(video_params.merge(user_id: current_user.id))
    if @video.save
      respond_with(@video)
    else
      render :action => 'new'
    end
  end

  def update
    if @video.update(video_params)
      respond_with(@video)
    else
      render :action => 'edit'
    end
  end

  def destroy
    @video.destroy
    respond_with(@video)
  end

  private
  def set_video
    @video = Video.find(params[:id])
  end

  def video_params
    params.require(:video).permit!
  end
end
