"use strict";

document.addEventListener("click", function(event)
{
  var target = event.target;
  while (target && target.localName != "a")
    target = target.parentNode;
  if (target && target.classList.contains("show-type-selector"))
  {
    var selector = document.querySelector(".type-selector");
    selector.style.left = (target.offsetLeft + 20) + "px";
    selector.style.top = (target.offsetTop + target.offsetHeight) + "px";
    if (selector.classList.contains("open"))
      selector.classList.remove("open");
    else
      selector.classList.add("open");
    event.preventDefault();
  }
  else if (target && target.classList.contains("type-selector-link"))
  {
    document.documentElement.className = target.getAttribute("data-type");
    document.querySelector(".type-selector").classList.remove("open");
    event.preventDefault();
  }
  else
    document.querySelector(".type-selector").classList.remove("open");
}, false);

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
  document.documentElement.className = type;
