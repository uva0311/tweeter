/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function() {

  function renderTweets(tweets) {
    // loops through tweets
    tweets.forEach(function (tweet) {
      // calls createTweetElement for each tweet
      $('.tweet-container').append(createTweetElement(tweet));
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
        <p class="tweet-body">${tweet.content.text}</p>
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

  renderTweets(data);
});



