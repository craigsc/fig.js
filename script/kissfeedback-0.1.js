(function() {
  onReady(function() {
    if (!getConfig().email) {
      console.log('KissFeedback has no target email address configured! Could not initialize.');
      return;
    }
    var feedbackButtons = getElementsByClassName('kissfeedback');
    if (!getConfig().disablePill) {
      var button = getDefaultFeedbackButton();
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

  function getDefaultFeedbackButton() {
    var button = document.createElement("div");
    button.innerHTML = "Feedback";
    button.style =
      "background-color:" + getPrimaryColor() + ";" +
      "bottom:0;right:0;position:absolute;z-index:9999;" +
      "margin-bottom:10px;margin-left:20px;margin-right:20px;width:114px;height:48px;" +
      "line-height:48px;text-align:center;vertical-align:middle;" +
      "font-family:\"Helvetica\",\"Arial\",sans-serif;font-weight:700;" +
      "-moz-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;" +
      "color:#fff;cursor:pointer;border-radius:999px;" +
      "user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none;";
    button.className = "kfButton";

    var hoverColor = shadeColor(getPrimaryColor(), -0.3);
    var css = '.kfButton:hover {background-color:' + hoverColor + ' !important}';
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
    var modal = document.getElementById('kfModal') || configureModal();
    modal.style.display = "block";
  }

  function configureModal() {
    var modal = document.createElement("div");
    modal.id = 'kfModal';
    modal.style =
      "display:none;position:fixed;z-index:99999;left:0;top:0;width:100%;height:100%;" +
      "overflow:auto;background-color:rgba(0,0,0,0.4);";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    var modalContent = document.createElement("div");
    modalContent.id = "kfModalContent";
    modalContent.style =
      "background-color:#fefefe;margin:15% auto;border:1px solid #888;width:30%;min-width:300px;" +
      "font-family:Helvetica,Arial,sans-serif;";

    var header = document.createElement("header");
    header.innerHTML = "How can we help?";
    header.style =
      "padding: 20px 30px;border-bottom: 1px solid rgba(0,0,0,.1);background: rgba(248,248,248,.9);" +
      "font-size: 25px;font-weight: 300;color: #232323;";
    modalContent.appendChild(header);

    var form = document.createElement("p");
    form.innerHTML = "Test Content. Helloooo.";
    modalContent.appendChild(form);

    var footer = document.createElement("footer");
    footer.style =
      "display: block;padding: 15px 30px 25px;border-top: 1px solid rgba(0,0,0,.1);" +
      "background: rgba(248,248,248,.9);overflow:hidden;";
    var button = document.createElement("button");
    button.type = "submit";
    button.innerHTML = "Send";
    button.className = 'kfButton';
    button.style =
      "float:right;height:39px;overflow: hidden;margin: 10px 0 0 20px;padding: 0 25px;" +
       "outline: none;border: 0;font: 300 15px/39px 'Open Sans', Helvetica, Arial, sans-serif;" +
       "text-decoration: none;color: #fff;cursor: pointer;" +
       "background-color:" + getPrimaryColor() + ";";
    footer.appendChild(button);
    modalContent.appendChild(footer);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    return modal;
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

  function getConfig() {
    var args = window['kf'].e || [];
    return args.length > 0 ? args[0][0] : {};
  }

  function getPrimaryColor() {
    return getConfig().color || '#0064cd';
  }
})();
