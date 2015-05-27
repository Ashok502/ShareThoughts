class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
    :recoverable, :rememberable, :trackable, :validatable
  has_many :products, :dependent => :destroy
  has_many :videos, :dependent => :destroy
  has_many :received_messages, :class_name => 'Message', :foreign_key => :receiver_id, :dependent => :destroy
  has_many :sent_messages, :class_name => 'Message', :foreign_key => :user_id, :dependent => :destroy
  validates :username, :uniqueness => true, :presence => true
end
