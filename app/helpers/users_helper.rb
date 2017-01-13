module UsersHelper
  def job_title_icon
    if @user.profile.job_title == "Photographer"
      "<i class='fa fa-camera-retro'></i>".html_safe
    elsif @user.profile.job_title == "Model"
      "<i class='fa fa-group'></i>".html_safe
    elsif @user.profile.job_title == "Designer"
      "<i class='fa fa-cubes'></i>".html_safe
    end
  end
end