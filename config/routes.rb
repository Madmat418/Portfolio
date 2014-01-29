Portfolio::Application.routes.draw do
  root to: 'root#root'
  resources :snakes, :only => [:index]
  resources :asteroids, :only => [:index]
end
