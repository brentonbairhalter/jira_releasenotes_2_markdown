document.addEventListener('DOMContentLoaded', function() {
  var   getDownButton = document.getElementById('copy'),
          preCopy = document.getElementsByClassName('pre-copy')[0],
          postCopy = document.getElementsByClassName('post-copy')[0],
          scannerEl = document.getElementsByClassName('scanner')[0],
          jiraCheckEl = document.getElementsByClassName('not-jira')[0],
          showOptionsEl = document.getElementById('show-md-options'),
          optionsEl = document.getElementsByClassName('md-options-wrapper ')[0],
          optionsShowing = false;

  showOptionsEl.addEventListener('click', function() {
    if (!optionsShowing) {
          optionsEl.style.display = 'block';
          optionsShowing = true;
    } else {
          optionsEl.style.display = 'none';
          optionsShowing = false;
    }
  }, false);

  getDownButton.addEventListener('click', function() {
    chrome.tabs.query({currentWindow: true, active :true}, function(tabs) {
      if (~tabs[0].url.indexOf('://jira') ) {
        var colCount = document.getElementById('col-count').value,
              numberCol = document.getElementById('story-number-col').value,
              nameCol = document.getElementById('story-name-col').value;

            chrome.tabs.sendMessage(tabs[0].id, {
                scriptOptions: {
                    colCount: colCount,
                    numberCol: numberCol,
                    nameCol: nameCol,
                  }
            }, function(response){
            });

            scannerEl.style.right = '220px'
            preCopy.style.display = 'none';
            postCopy.style.display = 'block';
            postCopy.style.opacity = 1;
      } else {
        jiraCheckEl.style.display = 'block';
        preCopy.style.display = 'none';
        postCopy.style.display = 'none';
      }
    });
  }, false);
}, false);