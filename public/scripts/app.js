/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  loadTweets();
  tweetSubmit();
  autoFocus();

  // for on click auto focus on form textarea
  function autoFocus() {
    $('#compose').click(function() {
      $('textarea[name="text"]').focus();
    });
  }

  // compse new tweet via form submit
  function tweetSubmit() {
    $('form').submit(function(event) {
        let tweetLength = $('textarea[name="text"]').val().length;
        if(tweetLength <= 140 && tweetLength > 0) {
            event.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/tweets',
                data: $('textarea[name="text"]').serialize(),
            }).success(function(data) {
                $('.tweet-container').empty().load(loadTweets());
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

  // function to utilize ajax call to load existing tweets
  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'json'
    }).success(function(data) {
      // set callback function
      renderTweets(data);
    });
  }

  function renderTweets(tweets) {
    // loops through tweets
    tweets.forEach(function (tweet) {
      // calls createTweetElement for each tweet
      $('.tweet-container').prepend(createTweetElement(tweet));
    });
  }

  function createTweetElement(tweet) {
    // converting timestamp to actual time difference
    let currentTimeStamp = new Date().getTime();
    let tweetTimeStamp = tweet.created_at;

    // putting down the html template and return as template string
    let $tweet = `
      <article class="tweet">
        <header class="tweet-header">
          <nav class="nav-bar">
              <img class="avatar" src="${tweet.user.avatars.regular}">
              <span class="name">${tweet.user.name}</span>
              <span class="username">${tweet.user.handle}</span>
          </nav>
        </header>
        <p class="tweet-body">${escape(tweet.content.text)}</p>
        <footer class="tweet-footer">
              <span class="day-posted">${timeDiff(currentTimeStamp, tweetTimeStamp)}</span>
              <i class="fas fa-heart"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-flag"></i>
        </footer>
      </article>
    `;
    return $tweet;
  }

  // helper function to convert time stamps into time difference
  function timeDiff(currentTimeStamp, tweetTimeStamp) {
    const difference = currentTimeStamp - tweetTimeStamp;
    const secondsDiff = Math.floor(difference/1000);
    const minutesDiff = Math.floor(secondsDiff/60);
    const hoursDiff = Math.floor(minutesDiff/60);
    const daysDiff = Math.floor(hoursDiff/24);
    const monthsDiff = Math.floor(daysDiff/30);
    const yearsDiff = Math.floor(monthsDiff/12);

    // depends on how far the tweet was posted,
    // returns to a proper time difference to display
    if(yearsDiff > 1){
      return `Posted ${yearsDiff} years ago`
    }
    if(monthsDiff > 1){
      return `Posted ${monthsDiff} month(s) ago`
    }
    if(daysDiff > 1){
      return `Posted ${daysDiff} day(s) ago`
    }
    if(hoursDiff > 1){
      return `Posted ${hoursDiff} hour(s) ago`
    }
    if(minutesDiff > 1){
      return `Posted ${minutesDiff} minute(s) ago`
    }
    if(secondsDiff > 1){
      return `Posted ${secondsDiff} second(s) ago`
    }
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
});


