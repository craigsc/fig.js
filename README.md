[Active Development: NOT YET FUNCTIONAL]

Fig is a simple js plugin that allows any project to easily and quickly integrate a simple mechanism to solicit and collect feedback from users.
No accounts or registration required. Just configure the plugin via he below script and collected feedback will flow directly to an email inbox of
your choosing. Incredibly lightweight, simple, and powerful.

Getting Started
====================
Simply upload the resources under the 'static' folder (cdn coming soon!) and then paste the following into the head of your website:

<script>
  (function(y,o,d,a,w,g){y[a]=y[a]||function(){(y[a].e=y[a].e||[]).push(arguments)};
   w=o.createElement(d);w.async=1;w.src='static/kissfeedback.js';
   g=o.getElementsByTagName(d)[0];g.parentNode.insertBefore(w,g)
   })(window,document,'script','kf');
  kf({'email': 'YOUR_EMAIL_HERE'});
</script>

Don't forget to edit 'YOUR_EMAIL_HERE' to point to an email address for your team (this is where the feedback is delivered to). 

Feedback Prompts
======================
Recommended: By default, this plugin injects a small 'pill' in the bottom right corner of the webpage to solicit feedback from users. 

Advanced: If you'd like to set up your own custom entrypoints for this feedback (such as a linktag in your header or footer) then simply add the classname 
'kissfeedback' to one or more elements on the page. A click on these elements will open our standard feedback flow.

Custom Configs
======================
You can turn on or off specific functionality by passing in a special config in the 'kf()' function call in your script tag. For example,
a standard integration looks like:
  
  kf({'email': 'YOUR_EMAIL_HERE'});

In this scenario, the supplied config is:

  {'email': 'YOUR_EMAIL_HERE'}

If you want to customize the color of the 'Feedback Pill' then we simply need to supply custom values for that feature:

  {'email': 'YOUR_EMAIL_HERE', 'color': '#9932CC'} // purple 

Supported Config Options
=========================
color: Value should be the hex value for the desired pill color that you want rendered. The value itself should be in the format of '#000000'.
disablePill: Takes in a true or false boolean. If true, the feedback pill is not injected on the page (meaning there is no entrypoint if you do not set up any elements with the 'kissfeedback' classname).
  