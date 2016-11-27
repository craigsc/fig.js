/* Embed code to enable fig. Do not directly include this
   file or copy this script as-is. Instead, use the mini-fied version
   included in the readme/instructions. This is purely to track the
   development and iteration of the embed approach on my end.

   Strongly based off of a much more simplified version of the
   google analytics approach to pass parameters to async loaded
   scripts (which is cool as shit btw). */
<script>
  (function(windowVar, documentVar, scriptVar, functionName, newScript, tmp) {
    windowVar[functionName]= windowVar[functionName] || function() {
      (windowVar.e = windowVar[functionName].e || []).push(arguments);
    };
    newScript = documentVar.createElement(scriptVar);
    newScript.async = 1;
    newScript.src = 'fig.js';
    tmp = documentVar.getElementsByTagName()[0];
    tmp.parentNode.insertBefore(newScript, tmp);
  })(window, document, 'script', 'fig');

  /* persist list of target emails via newly created function */
  fig({'email': 'a@b.com'});
</script>
