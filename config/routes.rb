Portfolio::Application.routes.draw do
  root to: 'root#root'
  resources :snakes, :only => [:index]
  resources :asteroids, :only => [:index]
  resources :snake_scores, :only => [:create, :index]
end
