class Product < ActiveRecord::Base
  ratyrate_rateable 'rating'
  belongs_to :category
  belongs_to :user
  has_many :images, :as => :imageable
  has_many :share_videos, :as => :videoable
  has_many :line_items
  accepts_nested_attributes_for :images, :allow_destroy => true, :reject_if => :all_blank

  validates :title, :description, :category_id, :quantity, :price, :presence => true
end
