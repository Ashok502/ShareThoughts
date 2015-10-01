class Video < ActiveRecord::Base
  has_attached_file :video
  validates_attachment_content_type :video,
    :content_type => ['video/mp4','video/x-flv','video/mpeg','video/ogg','video/ogv','video/mkv','video/3gpp','video/webm']

  belongs_to :videoable, :polymorphic => true

  def to_video_upload
    {
      "url" => video.url,
      "medium_url" => video.url(:medium)
    }
  end
end
