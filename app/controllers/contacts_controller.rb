class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end
  
  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      redirect_to new_contact_path, notice: "Message received, thanks!"
    else
      redirect_to new_contact_path, notice: "Oh man, something went wrong. Remember, everything needs to be filled out!"
    end
  end
  
  private
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
end