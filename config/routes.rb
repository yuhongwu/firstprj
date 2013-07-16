Berlin::Application.routes.draw do

  resource :mobile, only: [:edit, :update] do
    member do
      post 'send_verification_code'
    end
  end
  
  resource :profile, only: [:edit, :update]

  resources :cards, only: [:index, :new, :create, :show] do
    member do
      post 'charge'
    end
  end

  resources :orders, except: [:destroy] do
    member do
      post 'cancel'
    end
    resources :payments do
      member do
        get 'pay'
        post 'notify'
        get 'done'
      end
    end
  end

  resource :checkout, only: [:update]

  resource :cart, only: [:edit] do
    collection do
      post 'populate'
      post 'empty'
    end
    resources :line_items, only: [:update, :destroy]
  end

  resources :gyms, only: [:show] do
    member do
      post 'bookmark'
      post 'unbookmark'
    end

    collection do
      match :search
      get 'bookmarked'
    end

    resources :venues, only: [] do
      match :search, on: :collection
    end
  end

  namespace :admin do

    resources :companies

    resources :gym_groups

    resources :gyms do
      member do
        post 'confirm'
        post 'deny'
      end
      resources :gym_images, only: [:new, :create, :destroy]
    end

    match '/gym_session/:id' => 'gym_session#update', as: 'gym_session'

    # Dependent on current gym

    # resources :dashboard, only: [:index]

    resources :orders, except: [:new, :create] do
      member do
        post 'cancel'
        post 'check_in'
        get 'new_refund'
        post 'refund'
      end
      resources :payments do
        member do
          get 'pay'
          post 'notify'
          get 'done'
        end
      end
    end

    resource :cart do
      collection do
        post 'populate'
        put 'empty'
      end
      resources :line_items, only: [:update, :destroy]
    end

    resource :checkout, only: [:edit, :update]

    resources :venues, only: [:index] do
      collection do
        post 'publish'
      end
      resources :real_venues, only: [:index]
    end

    resources :activities do
      member do
        post 'enable'
        get 'try_disable'
        post 'disable'
      end

      resources :venues, only: [:new, :create, :edit, :update] do
        member do
          post 'disable'
        end

        collection do
          get 'manually'
        end
      end
    end

    resources :venue_inventories, only: [] do
      collection do
        get 'edit_individual'
        put 'update_individual'
      end
    end

    resources :products, except: [:show]

    resources :card_line_items, only: [:index]

    resources :cards do
      member do
        post 'charge'
      end

      resources :card_line_items, only: [:new, :create]
    end

    resources :card_types, except: [:show]
    
    resources :card_charges
    
    # Independence

    resources :users

    resources :cities, except: [:show]

    resources :areas, except: [:show]

    resources :venue_types, except: [:show]

    resources :payment_methods
    
  end

  match '/admin', to: 'admin/dashboard#index', as: :admin

  devise_for :users

  root to: 'home#index'
end
