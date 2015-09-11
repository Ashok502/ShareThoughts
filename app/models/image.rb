class Image < ActiveRecord::Base
  has_attached_file :image, :styles => {:thumb => '90*90>', :large => '180*180>'}
  validates :image, :presence => true
  validates_attachment_content_type :image,
    :content_type => [ 'image/jpeg','image/jpg', 'image/png', 'image/gif','image/bmp', 'image/x-png', 'image/pjpeg' ]
  belongs_to :imageable, :polymorphic => true
  crop_attached_file :image

  def to_file_upload
    {
      "url" => image.url,
      "thumbnail_url" => image.url(:large)
    }
  end
end
