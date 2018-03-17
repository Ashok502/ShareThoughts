module ApplicationHelper
  def respond_format
    respond_to do |format|
      format.js
    end
  end

  def conversation_interlocutor(conversation)
    conversation.recipient == current_user ? conversation.sender : conversation.recipient
  end

  def self_or_other(message)
    puts message.user == current_user
    message.user == current_user ? "self" : "other"    
  end

  def message_interlocutor(message)
    message.user == message.conversation.sender ? message.conversation.sender : message.conversation.recipient
  end
end
