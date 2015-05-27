class Video < ActiveRecord::Base
  has_attached_file :video
  validates_attachment_content_type :video,
    :content_type => [ 'video/mp4','video/ogg','video/webm','video/flv','video/mpeg','video/3gp']
  validates :video, :presence => true
  belongs_to :user
end
