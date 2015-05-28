class ChatsController < ApplicationController
  before_filter :authenticate_user!

  def create
    @conversation = Conversation.find(params[:conversation_id])
    @message = @conversation.chats.build(message_params)
    @message.user_id = current_user.id
    @message.save!
    @path = conversation_path(@conversation)
  end

  private

  def message_params
    params.require(:chat).permit!
  end
end
