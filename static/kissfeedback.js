(function() {
  onReady(function() {
    var config = getConfig();
    if (!config.email) {
      console.error('Error: KissFeedback requires an \'email\' to be provided.');
      return;
    }
    injectStylesheet();
    injectModal();
    injectPill();

    var feedbackButtons = getElementsByClassName('kissfeedback');
    for (var i = 0; i < feedbackButtons.length; i++) {
      setOnClickListener(feedbackButtons[i], openFeedbackForm);
    }
  });

  function injectPill(button) {
    if (getConfig().disablePill) {
      return;
    }
    button = button || getDefaultFeedbackButton();
    var canary = document.getElementById('kfCanary');
    var display = canary.currentStyle
      ? canary.currentStyle['display']
      : window.getComputedStyle
        ? window.getComputedStyle(canary, null).getPropertyValue('display')
        : null;
    if (display == 'none') {
      document.body.appendChild(button);
      setOnClickListener(button.children[0], openFeedbackForm);
    } else {
      setTimeout(function() { injectPill(button) }, 250);
    }
  }

  function setOnClickListener(element, fn) {
    if (element.addEventListener) {
      element.addEventListener('click', fn);
    } else {
      element.attachEvent('onclick', fn);
    }
  }

  function setOnSubmitListener(element, fn) {
    if (element.addEventListener) {
      element.addEventListener('submit', fn, false);
    } else {
      element.attachEvent('onsubmit', fn);
    }
  }

  function getDefaultFeedbackButton() {
    var color = getPrimaryColor();
    var buttonContainer = document.createElement("div");
    buttonContainer.id = 'kfPillContainer';

    var button = document.createElement("div");
    button.innerHTML = getConfig().pillText || "Feedback";
    button.id = 'kfPill';
    button.className = "kfButton";
    button.style.background = color;
    buttonContainer.appendChild(button);

    var pillPosition = getConfig().pillPosition;
    var animation = getConfig().pillAnimationSpeed || '0.5s';
    if (pillPosition == 'topLeft') {
      buttonContainer.style.top = 0;
      buttonContainer.style.left = 0;
      button.style.animation = animation + ' slide-down';
    } else if (pillPosition == 'topRight') {
      buttonContainer.style.top = 0;
      buttonContainer.style.right = 0;
      button.style.animation = animation + ' slide-down';
    } else if (pillPosition == 'bottomLeft') {
      buttonContainer.style.bottom = 0;
      buttonContainer.style.left = 0;
      button.style.animation = animation + ' slide-up';
    } else {
      buttonContainer.style.bottom = 0;
      buttonContainer.style.right = 0;
      button.style.animation = animation + ' slide-up';
    }

    var css =
      '.kfButton:hover { background-color:' +
      shadeColor(color, -0.3) +
      ' !important; }';
    css +=
      '.kfButton.kfLoading { background-color:' +
      shadeColor(color, 0.3) +
      ' !important; }';
    style = document.createElement('style');
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    return buttonContainer;
  }

  /* onClickListener. Open up feedback form for user. */
  function openFeedbackForm(event) {
    var modal = document.getElementById('kfModal') || injectModal();
    modal.style.display = "block";
  }

  function injectModal() {
    var modal = document.createElement("div");
    modal.id = 'kfModal';
    modal.style.display = 'none';
    document.body.appendChild(modal);
    setOnClickListener(modal, function(e) {
      if (e.target == modal) modal.style.display = "none";
    });

    var modalContent = document.createElement("div");
    modalContent.id = "kfModalContent";
    modal.appendChild(modalContent);

    var form = document.createElement('form');
    form.method = "post";
    form.action = "http://localhost:8888/feedback";
    setOnSubmitListener(form, function (e) { e.preventDefault(); return false;});
    modalContent.appendChild(form);

    var header = document.createElement("header");
    header.innerHTML = getConfig().formPrompt || "How can we help?";
    form.appendChild(header);

    var fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);

    var email = document.createElement("input");
    email.type = "email";
    email.name = "from_email";
    email.placeholder = "Your Email";
    email.className = 'kfField';
    email.autofocus = true;
    email.id = "kfEmail";
    var emailSection = document.createElement("section");
    emailSection.appendChild(email);
    fieldset.appendChild(emailSection);
    email.focus();

    var textarea = document.createElement("textarea");
    textarea.rows = "4";
    textarea.placeholder = "Message";
    textarea.className = 'kfField';
    textarea.name = "message";
    textarea.id = "kfTextArea";
    var taSection = document.createElement("section");
    taSection.appendChild(textarea);
    fieldset.appendChild(taSection);

    var footer = document.createElement("footer");
    form.appendChild(footer);

    var account = document.createElement("input");
    account.type = "hidden";
    account.name = "to_email";
    account.value = getConfig().email;
    footer.appendChild(account);

    /*
    var logo = document.createElement("a");
    logo.id = 'kfLogo';
    logo.target = '_blank';
    logo.href = 'http://www.craigsc.com';
    logo.innerHTML = 'KISSfeedback';
    footer.appendChild(logo);
    */

    var button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "Send";
    button.className = 'kfButton';
    button.id = "kfSubmitButton";
    button.style.background = getPrimaryColor();
    footer.appendChild(button);
    setOnClickListener(
      button,
      function(e) {
        if (validateForm()) {
          ajaxSubmit(form, onSuccess, onFailure);
          formIsSending(true);
        }
        return false;
      });

    var canary = document.createElement("div");
    canary.id = 'kfCanary';
    modal.appendChild(canary);

    return modal;
  }

  // TODO: form validation
  function validateForm() {
    return true;
  }

  function formIsSending(disable) {
    var email = document.getElementById("kfEmail");
    var message = document.getElementById("kfTextArea");
    var button = document.getElementById("kfSubmitButton");
    email.disabled = disable;
    message.disabled = disable;
    button.disabled = disable;
    button.innerHTML = disable ? 'Sending...' : 'Send';
    if (disable) {
      button.className += " kfLoading";
    } else {
      button.className = "kfButton";
    }
  }

  function onSuccess(xhr) {
    if (xhr.currentTarget.responseText != "1") {
      onFailure(xhr);
      return;
    }
    console.log(xhr, 'Success!');
    var button = document.getElementById('kfSubmitButton');
    button.innerHTML = "Sent!";
  }

  function onFailure(xhr) {
    formIsSending(false);
    // TODO: Add unexpected failure message
    console.log(xhr, 'Failure!');
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
    var f=parseInt(color.slice(1),16), t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }

  function getConfig() {
    var args = window['kf'].e || [];
    return args.length > 0 ? args[0][0] : {};
  }

  function getPrimaryColor() {
    return getConfig().color || '#0064cd';
  }

  function injectStylesheet() {
    var id = 'kfStylesheet';
    if (document.getElementById(id)) {
      return;
    }
    var link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = '../static/kissfeedback.css';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  /* See http://stackoverflow.com/a/34296482 */
  function ajaxSubmit(form, success_callback, failure_callback) {
    var xhr = new XMLHttpRequest();
    var params = [].filter.call(form.elements, function (el) {
        return !(el.type in ['checkbox', 'radio']) || el.checked;
        })
      .filter(function(el) { return !!el.name; }) //Nameless elements die.
      .filter(function(el) { return !el.disabled; }) //Disabled elements die.
      .map(function(el) {
        return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
        })
      .join('&'); //Then join all the strings by &
    xhr.open("POST", form.action);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = success_callback.bind(xhr);
    xhr.onerror = failure_callback && failure_callback.bind(xhr);
    xhr.send(params);
  }
})();
