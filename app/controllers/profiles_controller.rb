class ProfilesController < ApplicationController
  
  
  # GET to /users/:user_id/profile_new
  def new
    @profile = Profile.new
  end
end