Rails.application.routes.draw do
  resources :apartments
  devise_for :users
  get '*path', to: 'pages#index', constraints: ->(request){ request.format.html?}
  root to: 'pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
