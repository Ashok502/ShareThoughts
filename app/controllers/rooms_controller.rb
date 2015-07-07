class RoomsController < ApplicationController
  before_filter :config_opentok,:except => [:index]
  
  def index
    @rooms = Room.where(:public => true).order("created_at DESC")
    @new_room = Room.new
  end

  def create
    session = @opentok.create_session :media_mode => :relayed
    params[:room][:sessionId] = session.session_id

    @new_room = Room.new(new_params)

    respond_to do |format|
      if @new_room.save
        format.html { redirect_to("/party/"+@new_room.id.to_s) }
      else
        format.html { render :controller => 'rooms', :action => "index"}
      end
    end
  end

  def party
    @room = Room.find(params[:id])
    @tok_token = @opentok.generate_token :session_id => @room.sessionId 
  end

  def config_opentok
    if @opentok.nil?
      @opentok = OpenTok::OpenTok.new 45277372, "d0659154ca941b7ef3f590d73e96861fd30aee28"
    end
  end
  
  private
  def new_params
    params.require(:room).permit!
  end
end