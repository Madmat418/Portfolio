class AsteroidsController < ApplicationController
  def index
    flash[:message] = "My apologies, it seems I sent you a bad link.  Fortunately, you can get anywhere on my site from this page, so just click on what you would like to see."
    redirect_to root_url
  end
end
