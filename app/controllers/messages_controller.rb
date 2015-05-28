class MessagesController < ApplicationController
  before_filter :is_login?
  def inbox
    @messages = current_user.received_messages.paginate :page => params[:message_page], :per_page => 10
  end
  
  def outbox
    @messages = current_user.sent_messages.paginate :page => params[:message_page], :per_page => 10
  end
  
  def reply
    @message = Message.find(params[:id])
  end
  
  def new
    @message = Message.new
    respond_format
  end
  
  def create
    @message = Message.new(new_params.merge(user_id: current_user.id))
    if @message.save
      respond_format
    end
  end
  
  private
  def new_params
    params.require(:message).permit!
  end
end
