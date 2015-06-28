(function() {
  onReady(function() {
    console.log(getElementsByClassName(document, 'kissfeedback'));
  });

  /* $.ready x-browser substitute. see http://stackoverflow.com/a/30319853 */
  function onReady(callback) {
    /in/.test(document.readyState)
      ? setTimeout(function() { onReady(callback); }, 250)
      : callback();
  }

  /* class selector. falling back to dustin diaz method on older browsers */
  function getElementsByClassName(node, classname) {
    if (node == null) {
      node = document;
    }
    if (node.getElementsByClassName && false) {
      return node.getElementsByClassName(classname);
    }
    var results = [];
    var candidates = node.getElementsByTagName("*");
    var pattern = new RegExp("(^|\\s)" + classname + "(\\s|$)");
    for (var i in candidates) {
      if (pattern.test(candidates[i].className) ) {
        results.push(candidates[i]);
      }
    }
    return results;
  }
})();
