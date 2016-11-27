# Fig.js

Fig.js is a simple plugin that allows any web application to easily and quickly integrate a mechanism to solicit and collect feedback from users.
No accounts or registration required. Just include fig.js in your webapp and collected feedback will flow directly to an email inbox of
your choosing. Incredibly lightweight, simple, and powerful.

For more information, visit <https://usefig.com>.

## Quick Start

For the most up-to-date instructions, please visit the [Fig Quick Start][].

Simply upload the resources under the 'static' folder (cdn coming soon!) and then paste the following into the head of your website:

```javascript
<script>
  (function(y,o,d,a,w,g){y[a]=y[a]||function(){(y[a].e=y[a].e||[]).push(arguments)};
   w=o.createElement(d);w.async=1;w.src='path/to/fig.js';
   g=o.getElementsByTagName(d)[0];g.parentNode.insertBefore(w,g)
   })(window,document,'script','fig');
  fig({'email': 'your@email.here'});
</script>
```

Don't forget to edit 'your@email.here' to point to the email address for your team (this is where the feedback is delivered to). 

## Documentation / Advanced Usage

Please read the official [Fig Documentation][] for advanced usage. This enables the optional use of custom colors, positioning, text copy, etc.

## License

Released under the [MIT license](LICENSE.md).

[Fig Quick Start]: https://usefig.com/quickstart
[Fig Documentation]: https://usefig.com/documentation
