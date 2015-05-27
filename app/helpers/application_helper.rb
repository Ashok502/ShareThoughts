module ApplicationHelper
  def respond_format
    respond_to do |format|
      format.js
    end
  end
end
