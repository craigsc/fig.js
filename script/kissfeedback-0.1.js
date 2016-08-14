(function() {
  onReady(function() {
    var args = window['kf'].e || [];
    var config = args.length > 0 ? args[0][0] : [];
    if (!config.email) {
      console.log('KissFeedback has no target email address configured! Could not initialize.');
      return;
    }
    var feedbackButtons = getElementsByClassName('kissfeedback');
    if (!config.disablePill) {
      var button = getDefaultFeedbackButton(config.color || '#0064cd');
      document.body.appendChild(button);
      feedbackButtons = [].slice.call(feedbackButtons);
      feedbackButtons.push(button);
    }
    for (var i = 0; i < feedbackButtons.length; i++) {
      if (feedbackButtons[i].addEventListener) {
        feedbackButtons[i].addEventListener('click', openFeedbackForm);
      } else {
        feedbackButtons[i].attachEvent('onclick', openFeedbackForm);
      }
    }
  });

  function getDefaultFeedbackButton(bgColor) {
    var button = document.createElement("div");
    button.innerHTML = "Feedback";
    button.style =
      "background-color:" + bgColor + ";" +
      "bottom:0;right:0;position:absolute;z-index:9999;" +
      "margin-bottom:10px;margin-left:20px;margin-right:20px;width:114px;height:48px;" +
      "line-height:48px;text-align:center;vertical-align:middle;" +
      "font-family:\"Helvetica\",\"Arial\",sans-serif;font-weight:700;" +
      "-moz-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;" +
      "color:#fff;cursor:pointer;border-radius:999px;" +
      "user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none;";
    button.className = "kfPill";

    var hoverColor = shadeColor(bgColor, -0.3);
    var css = '.kfPill:hover {background-color:' + hoverColor + ' !important}';
    style = document.createElement('style');
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    return button;
  }

  /* onClickListener. Open up feedback form for user. */
  function openFeedbackForm(event) {
    console.log('CLICK');
    if (true) {
      //configureModal();
    }

  }

  /* $.ready x-browser substitute. see http://stackoverflow.com/a/30319853 */
  function onReady(callback) {
    /in/.test(document.readyState)
      ? setTimeout(function() { onReady(callback); }, 250)
      : callback();
  }

  function stringToNodes(html_string) {
    var div = document.createElement('div');
    div.innerHTML = html_string;
    return div;
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

  /* Calculate darker shade of color for hover. See http://stackoverflow.com/a/13542669 */
  function shadeColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }
})();
