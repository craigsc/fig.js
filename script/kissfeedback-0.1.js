(function() {
  onReady(function() {
    var feedbackButtons = getElementsByClassName('kissfeedback');
    var emails = window['kf'].e || [];
    if (feedbackButtons.length < 1 || emails.length < 1) {
      return;
    }

    for (var i = 0; i < feedbackButtons.length; i++) {
      if (feedbackButtons[i].addEventListener) {
        feedbackButtons[i].addEventListener('click', openFeedbackForm);
      } else {
        feedbackButtons[i].attachEvent('onclick', openFeedbackForm);
      }
    }


  });

  /* onClickListener. Open up feedback form for user. */
  function openFeedbackForm(event) {
    console.log('open!', event);
  }

  /* $.ready x-browser substitute. see http://stackoverflow.com/a/30319853 */
  function onReady(callback) {
    /in/.test(document.readyState)
      ? setTimeout(function() { onReady(callback); }, 250)
      : callback();
  }

  /* class selector. falling back to dustin diaz method on older browsers */
  function getElementsByClassName(classname) {
    if (document.getElementsByClassName) {
      return document.getElementsByClassName(classname);
    }
    var matches = [];
    var candidates = document.getElementsByTagName("*");
    var pattern = new RegExp("(^|\\s)" + classname + "(\\s|$)");
    for (var i = 0; i < candidates.length; i++) {
      if (pattern.test(candidates[i].className) ) {
        matches.push(candidates[i]);
      }
    }
    return matches;
  }
})();
