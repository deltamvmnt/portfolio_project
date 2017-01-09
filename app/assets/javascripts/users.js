/* global $, Stripe */
//Document ready function.
$(document).on('turbolinks:load',function(){
  var theForm = $('#pro_form');
  var signupBtn = $('#form-signup-btn');
  
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When users clicks form submit button, prevent default submission behaviour.
  signupBtn.click(function(event){
    event.preventDefault()
    
      //Collect card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
      //Send card info to stripe.
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
  });
  

  //Stripe will return a card token.
  //Inject card token as hidden field into form.
  //Submit form to rails app.
  });