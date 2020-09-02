// 360
(function (b, a, e, h, f, c, g, s) {
  b[h] = b[h] || function () { (b[h].c = b[h].c || []).push(arguments) };
  b[h].s = !!c; g = a.getElementsByTagName(e)[0]; s = a.createElement(e);
  s.src = "//s.union.360.cn/" + f + ".js"; s.defer = !0; s.async = !0; g.parentNode.insertBefore(s, g)
})(window, document, "script", "_qha", 355044, false);

// Global site tag (gtag.js) - Google Analytics
var googleGtag1 = document.createElement("script");
googleGtag1.type = "text/javascript";
googleGtag1.async = true;
googleGtag1.src = "https://www.googletagmanager.com/gtag/js?id=UA-176780645-1";
document.getElementsByTagName('head')[0].appendChild(googleGtag1);

var googleGtag2 = document.createElement("script");
googleGtag2.innerHTML = '\
  window.dataLayer = window.dataLayer || [];\
  function gtag(){dataLayer.push(arguments);}\
  gtag("js", new Date());\
  gtag("config", "UA-176780645-1");';
document.getElementsByTagName('head')[0].appendChild(googleGtag2);

// Baidu Tongji
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?b5ed39aa9fda6e5a257d1621636623fa";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
