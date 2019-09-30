"use strict";

var webclientVersion = "2.2.3";

function animate(obj, property, steps, interval)
{
  obj[property] = obj[property] - obj[property] / steps;
  if (steps > 0)
  {
    window.setTimeout(function()
    {
      animate(obj, property, steps - 1, interval);
    }, interval);
  }
}

document.addEventListener("click", function(event)
{
  var target = event.target;
  while (target && target.localName != "a" && target.localName != "button")
    target = target.parentNode;
  if (target && /\bscrollup\b/.test(target.className))
  {
    var obj = document.documentElement.scrollTop ? document.documentElement : document.body;
    animate(obj, "scrollTop", 20, 20);
    event.preventDefault();
  }
  else if (target && /\bstart-webclient\b/.test(target.className))
  {
    var frame = document.createElement("iframe");
    frame.className = "webclient";
    frame.src = "/webclient_static/" + webclientVersion + "/";
    frame.addEventListener("load", function()
    {
      frame.contentWindow.focus();
    }, false);

    var content = document.querySelector(".content");
    content.textContent = "";
    content.appendChild(frame);

    var onResize = function()
    {
      var optimalHeight = frame.offsetHeight +
                          document.documentElement.clientHeight -
                          document.documentElement.offsetHeight;
      if (optimalHeight <= 300 && !content.classList.contains("no-padding"))
      {
        document.querySelector("nav").hidden = true;
        document.querySelector("footer").hidden = true;
        content.classList.add("no-padding");
        onResize();
        return;
      }
      frame.style.height = optimalHeight > 300 ? optimalHeight + "px" : "";
    };
    window.addEventListener("resize", onResize, false);
    onResize();
  }
  else if (target && /\bshow-type-selector\b/.test(target.className))
  {
    var selector = document.getElementById("type-selector");
    var rect = target.getBoundingClientRect();
    selector.style.left = (window.scrollX + rect.left + 20) + "px";
    selector.style.top = (window.scrollY + rect.bottom) + "px";
    selector.className = selector.className ? "" : "active";
    event.preventDefault();
  }
  else if (target && /\btype-selector-link\b/.test(target.className))
  {
    document.documentElement.className = "index " + target.getAttribute("data-type");
    document.getElementById("type-selector").className = "";
    event.preventDefault();
  }
  else
  {
    var selector = document.getElementById("type-selector");
    if (selector && selector.className)
      selector.className = "";
  }
}, false);

if (/\bindex\b/.test(document.documentElement.className))
{
  // Try detecting user's browser
  var ua = navigator.userAgent;
  var type = null;
  if (ua.indexOf("OPR/") >= 0)
    type = "opera";
  else if (ua.indexOf("Chromium/") >= 0)
    type = "chrome";
  else if (ua.indexOf("Firefox/") >= 0)
    type = "firefox";

  if (type)
    document.documentElement.className = "index " + type;
}
