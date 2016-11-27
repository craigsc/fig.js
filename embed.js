/*
  DO NOT DIRECTLY INCLUDE THIS FILE OR COPY THIS SCRIPT AS-IS.
  This file and code is simply to track the code and approach
  currently in-use to embed fig.js into web applications. Please
  follow the instructions in the readme instead.
*/

/*
  Approach #1

  Simplistic embed approach. Easy for devs to parse and trust, vs
  approach number 2 which looks suspicious when minified (but is
  obviously more performant and doesn't impact TTI
*/
<script src="/path/to/fig.js"></script>
<script>
fig({
  'email': 'your@email.here',
});
</script>

/*
  Approach #2

  Embed code to asynchronously include fig.js. Unblocks loading
  of web applications.
*/
<script>
  (function(windowVar, documentVar, scriptVar, functionName, newScript, tmp) {
    windowVar[functionName]= windowVar[functionName] || function() {
      (windowVar.e = windowVar[functionName].e || []).push(arguments);
    };
    newScript = documentVar.createElement(scriptVar);
    newScript.async = 1;
    newScript.src = 'path/to/fig.js';
    tmp = documentVar.getElementsByTagName()[0];
    tmp.parentNode.insertBefore(newScript, tmp);
  })(window, document, 'script', 'fig');

  /* persist list of target emails via newly created function */
  fig({'email': 'your@email.here'});
</script>
