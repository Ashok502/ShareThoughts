class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
    :recoverable, :rememberable, :trackable, :validatable
  has_many :products, :dependent => :destroy
  has_many :orders, :dependent => :destroy
  has_many :videos, :dependent => :destroy
  has_many :received_messages, :class_name => 'Message', :foreign_key => :receiver_id, :dependent => :destroy
  has_many :sent_messages, :class_name => 'Message', :foreign_key => :user_id, :dependent => :destroy
  validates :username, :uniqueness => true, :presence => true
  has_many :conversations, :foreign_key => :sender_id
  
  has_attached_file :avatar, :styles => {:thumb => '90*90>', :large => '180*180>'}
  validates_attachment_content_type :avatar,
    :content_type => [ 'image/jpeg','image/jpg', 'image/png', 'image/gif','image/bmp', 'image/x-png', 'image/pjpeg' ]

  has_attached_file :cover_photo, :styles => {:thumb => '90*90>', :large => '180*180>'}
  validates_attachment_content_type :cover_photo,
    :content_type => [ 'image/jpeg','image/jpg', 'image/png', 'image/gif','image/bmp', 'image/x-png', 'image/pjpeg' ]

  
  after_create :create_default_conversation


  private

  # for demo purposes

  def create_default_conversation
    Conversation.create(sender_id: 1, recipient_id: self.id) unless self.id == 1
  end
end
