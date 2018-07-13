Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :mazes, only: [:index, :show, :update]
  resources :hay_patches, only: [:index, :show]
  resources :maze_users, only: [:index, :show, :create, :update]
  resources :users, only: [:index, :show, :create]
  resources :characters, only: [:index, :show]
end
