document.addEventListener('DOMContentLoaded', function() {
  var   getDownButton = document.getElementById('copy'),
          preCopy = document.getElementsByClassName('pre-copy')[0],
          postCopy = document.getElementsByClassName('post-copy')[0],
          scannerEl = document.getElementsByClassName('scanner')[0],
          jiraCheckEl = document.getElementsByClassName('not-jira')[0];

  getDownButton.addEventListener('click', function() {
    chrome.tabs.query({currentWindow: true, active :true}, function(tabs) {
      console.log(tabs[0].url);
      if (~tabs[0].url.indexOf('://jira') ) {
        chrome.tabs.executeScript({
          file: 'content1.js'
        });
            scannerEl.style.right = '220px'
            preCopy.style.display = 'none';
            postCopy.style.display = 'block';
      } else {
        jiraCheckEl.style.display = 'block';
        preCopy.style.display = 'none';
        postCopy.style.display = 'none';
      }
    });
  }, false);
}, false);