/* global $, Stripe */
//Document ready function.
$(document).on('turbolinks:load',function(){
  var theForm = $('#pro_form');
  var signupBtn = $('#form-signup-btn');
  
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When users clicks form submit button, prevent default submission behaviour.
  signupBtn.click(function(event){
    event.preventDefault();
    signupBtn.val("Processing").prop('disabled',true)
    
      //Collect card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
      //Use stripe JS library to check for card errors
      var error = false;
      
      //Validate card number
      if (!Stripe.card.validateCardNumber(ccNum)) {
        error = true;
        alert('The credit card number appears to be invalid')
      }
      
      //Validate CVC
      if (!Stripe.card.validateCVC(cvcNum)) {
        error = true;
        alert('The CVC number appears to be invalid')
      }
      
      //Validate card expiration
      if (!Stripe.card.validateExpiry(expMonth,expYear)) {
        error = true;
        alert('The expiration date appears to be invalid')
      }
        if (error) {
          //If there are card errors, don't send to stripe
          
        } 
        else {
          //Send card info to stripe.
          Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear
          }, stripeResponseHandler);
      }
      return false;
      
  });
  //Stripe will return a card token.  
  function stripeResponseHandler(status, response) {
    //Get the token from the response.
    var token = response.id;
    
    //Inject the card token into a hidden field.
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //Submit form to rails app.
    theForm.get(0).submit();
  }
});