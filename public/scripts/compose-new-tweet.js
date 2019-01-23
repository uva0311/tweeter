// function to handle new tweet submission
$(document).ready(function() {
  function tweetSubmit() {
    $('form').submit(function(event) {
        let tweetLength = $('textarea[name="text"]').val().length;
        if(tweetLength <= 140 && tweetLength > 0) {
            event.preventDefault();
              // let url = $('form').attr('action');
            $.ajax({
                method: 'POST',
                url: '/tweets',
                data: $('textarea[name="text"]').serialize()
            }).success(function() {
                console.log($('textarea[name="text"]').val());
                //$().prepend(html);
              });
        } else if(tweetLength > 140) {
            console.log(tweetLength);
            alert('Tweet is too long!');
            return false;
        } else if(tweetLength == 0) {
            console.log(tweetLength);
            alert('There is no tweet to submit.');
            return false;
        }
    });
  }

  tweetSubmit();

});