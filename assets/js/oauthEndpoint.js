"use strict";

function parseParameters()
{
  document.getElementById("copy").addEventListener("click", doCopy, false);

  var hash = location.hash;
  if (!hash)
    return;

  var response = {};
  var params = hash.substr(1).split("&");
  for (var i = 0; i < params.length; i++)
  {
    var parts = params[i].split("=", 2);
    if (decodeURIComponent(parts[0]) == "access_token")
    {
      var field = document.getElementById("code");
      field.value = decodeURIComponent(parts[1]);
      field.select();
      field.focus();
    }
  }
}

function doCopy(event)
{
  event.preventDefault();

  var field = document.getElementById("code");
  field.select();
  document.execCommand("copy", false, null);
}

window.addEventListener("load", parseParameters, false);
