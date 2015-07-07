class Order < ActiveRecord::Base
  belongs_to :cart
  belongs_to :user
  serialize :params
  attr_accessor :card_number, :card_verification
  validate :validate_card, :on => :create

  def purchase
    begin
      process_payment
    rescue => e
      logger.error("Order failed with error message #{e} ")
      self.update_attributes(:action => "purchase", :amount => price, :success => false, :message => e)
    end
    save
  end
  
  def express_token=(token)
    self[:express_token] = token
    if new_record? && !token.blank?
      details = EXPRESS_GATEWAY.details_for(token)
      self.express_payer_id = details.payer_id
      self.first_name = details.params["first_name"]
      self.last_name = details.params["last_name"]
    end
  end
  
  def price
    self.cart.total_price
  end
  
  protected
  
  def process_payment
    ActiveMerchant::Billing::Base.mode = :test
    response = process_purchase
    self.update_attributes(:action => "purchase", :amount => price, :success => response.success?, :authorization => response.authorization, :message => response.message, :params => response.params)
  end
  
  private
  
  def process_purchase
    if self.payment_type == 'brian_tree'
      BRIANTREE_GATEWAY.purchase(price*100, credit_card, standard_purchase_options)
    elsif self.payment_type == 'checkout'
      PAYPAL_GATEWAY.purchase(price*100, credit_card, standard_purchase_options)
    elsif self.payment_type == 'paypal_express'
      EXPRESS_GATEWAY.purchase(price*100, express_purchase_options)
    elsif self.payment_type == 'authorize'
      AUTHORIZE_GATEWAY.purchase(price*100, credit_card, standard_purchase_options)
    end
  end
  
  def standard_purchase_options
    {
      :ip => ip_address,
      :billing_address => {
        :name => "Ryan Bates",
        :address1 => "123 Main St.",
        :city => "New York",
        :state => "NY",
        :country => "US",
        :zip => "10001"
      }
    }
  end
  
  def express_purchase_options
    {
      :ip => ip_address,
      :token => express_token,
      :payer_id => express_payer_id
    }
  end
  
  def validate_card
    if express_token.blank? && !credit_card.valid?
      credit_card.errors.full_messages.each do |message|
        errors.add(:base, message)
      end
    end
  end
  
  def credit_card
    @credit_card ||= ActiveMerchant::Billing::CreditCard.new(
      :type => card_type,
      :number => card_number,
      :verification_value => card_verification,
      :month => card_expires_on.month,
      :year => card_expires_on.year,
      :first_name => first_name,
      :last_name => last_name
    )
  end
end