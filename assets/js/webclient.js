"use strict";

var webclientVersion = "2.2.3";

document.addEventListener("click", function(event)
{
  var target = event.target;
  while (target && target.localName != "button")
    target = target.parentNode;
  if (!target || !/\bstart-webclient\b/.test(target.className))
    return;

  var frame = document.createElement("iframe");
  frame.className = "webclient";
  frame.src = "/webclient_static/" + webclientVersion + "/";
  frame.addEventListener("load", function()
  {
    frame.contentWindow.focus();
  }, false);

  var content = document.getElementById("main");
  content.textContent = "";
  content.setAttribute("data-less-padding", "true");
  content.appendChild(frame);

  function onResize()
  {
    var optimalHeight = frame.offsetHeight +
                        document.documentElement.clientHeight -
                        content.scrollHeight;
    frame.style.height = optimalHeight > 300 ? optimalHeight + "px" : "";
  };
  window.addEventListener("resize", onResize, false);
  onResize();
}, false);
