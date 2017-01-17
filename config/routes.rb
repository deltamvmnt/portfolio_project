Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users, controllers: { registrations: 'users/registrations' }
  get 'about', to: 'pages#about'
  get 'whatsnext', to: 'pages#whatsnext'
  resources :contacts, only: :create
  get 'contact-me', to: 'contacts#new', as: 'new_contact'
  get 'ryematch', to: 'pages#ryematch'
  resources :users do
    resource :profile
  end
end
