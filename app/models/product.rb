class Product < ActiveRecord::Base
  belongs_to :category
  belongs_to :user
  has_many :images, :as => :imageable
  accepts_nested_attributes_for :images, :allow_destroy => true, :reject_if => :all_blank
  
  validates :title, :description, :category_id, :price, :presence => true
end
