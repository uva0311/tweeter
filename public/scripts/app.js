/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
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
}

$(document).ready(function() {

function createTweetElement(tweet) {
  let $tweet = `
    <article class="tweet">
      <header class="tweet-header">
        <nav class="nav-bar">
            <img class="avatar" src="${tweet.user.avatars.regular}">
            <span class="name">${tweet.user.name}</span>
            <span class="username">${tweet.user.handle}</span>
        </nav>
      </header>
      <p class="tweet-body">${tweet.user.handle}</p>
      <footer class="tweet-footer">
            <span class="day-posted">10 days ago</span>
            <i class="fas fa-heart"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-flag"></i>
      </footer>
    </article>
  `;

  return $tweet;
}

let $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
$('.tweet-container').append($tweet);

console.log($tweet); // to see what it looks like

});



