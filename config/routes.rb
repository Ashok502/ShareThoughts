Rails.application.routes.draw do

  resources :widgets

  get '/party/:id', :to => "rooms#party", :as => :party

  post '/rate' => 'rater#create', :as => 'rate'
  root :to => 'home#index'
  resources :carts, :home, :categories, :banners, :orders, :rooms

  resources :products do
    resources :images do
      collection do
        get :image_destroy
      end
    end
    resources :reviews
    resources :videos do
      collection do
        get :video_destroy
      end
    end
    member do
      get :add_to_cart
    end
  end

  resources :conversations do
    resources :chats
  end

  resources :messages do
    collection do
      get :inbox, :outbox
    end
  end
  devise_for :users

  get '/setting/:id' => 'home#setting', :as => :setting
  get '/about_us' => 'home#about_us', :as => :about_us
  get '/contact_us' => 'home#contact_us', :as => :contact_us
  get '/services' => 'home#services', :as => :services
  put '/update_setting/:id' => 'home#update_setting', :as => :update_setting
  put '/change_password/:id' => 'home#change_password', :as => :change_password
  get '/order/express' => 'orders#express', :as => :pay
  post '/payu_callback'=>'carts#payu_return'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
