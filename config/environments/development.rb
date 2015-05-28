Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true
  Paperclip.options[:command_path] = "/usr/local/bin/"

  # Adds additional error checking when serving assets at runtime.
  # Checks for improperly declared sprockets dependencies.
  # Raises helpful error messages.
  config.assets.raise_runtime_errors = true
  
  config.action_mailer.default_url_options = { :host => 'localhost:3000' }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    :address              => "smtp.sendgrid.net",
    :port                 => 587,
    #:domain               => '107.155.72.173:80',
    :user_name            => 'Ashok098',
    :password             => 'ashok123',
    :authentication       => 'plain',
    :enable_starttls_auto => true
  }
  
  config.after_initialize do
    ActiveMerchant::Billing::Base.mode = :test
    brain_tree = {
      :merchant_id => 'ty26pmqwrmcb372f',
      :public_key  => 'k2knfyvpfz77fjy8',
      :private_key => '1080c2771aa54e19a59bcbf5ac41d93a'
    }
    paypal = {
      :login => "seller_1229899173_biz_api1.railscasts.com",
      :password => "FXWU58S7KXFC6HBE",
      :signature => "AGjv6SW.mTiKxtkm6L9DcSUCUgePAUDQ3L-kTdszkPG8mRfjaRZDYtSu"
    }
    authorize = {
      :login => '9Z7PR6t7juz',
      :password=> '72W5yEA58fa5r5FQ'
    }
    ::BRIANTREE_GATEWAY = ActiveMerchant::Billing::BraintreeGateway.new(brain_tree)
    ::PAYPAL_GATEWAY = ActiveMerchant::Billing::PaypalGateway.new(paypal)
    ::EXPRESS_GATEWAY = ActiveMerchant::Billing::PaypalExpressGateway.new(paypal)
    ::AUTHORIZE_GATEWAY = ActiveMerchant::Billing::AuthorizeNetGateway.new(authorize)
  end

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true
end
SITE= 'http://localhost:3000'
