$(document).ready(function() {

  // counting number of characters from the input tweet
  let tweetChar = 140;
  $('.new-tweet textarea').keyup(updateCount);

  function updateCount() {
    const selector = '.new-tweet .counter';
    let tweetCharLeft = tweetChar - $(this).val().length;

    $(selector).text(tweetCharLeft);
    if($(this).val().length > 140){
      $(selector).css('color', 'red');
    } else {
      $(selector).css('color', 'black');
      // set the error message to be hidden, in case user try to enter
      // a valid tweet again
      $('.isa_error').css('opacity','0');
    }
  }
});




