---
title: Try PfP online
---

{{< script "webclient.js" >}}

## Important notice, please read

This is the *legacy* PfP 2.x version, not the current PfP 3.x. It uses its own data format instead of KeePass databases. Also, while it looks similar, there are conceptual differences. In particular, the legacy version distinguished between generated and stored passwords, the current version doesn’t.

You should **never** enter your PfP main password on any website. While this page will store all data only in your browser and safely encrypted, there is no reason why you should trust it. This online version of PfP is for demonstration purposes only, for anything else you should [download your own copy](#install) and use it from your computer.

Also, the online version has a number of [important limitations](#limitations) that make it less secure than the PfP browser extension. Most importantly, it doesn't have the ability to fill in passwords for you, so it cannot verify that your password is being entered on the right website. It is recommended that you [install the PfP browser extension](/) if possible.

<button class="start-webclient">Understood, let me try it now</button>

## Limitations {#limitations}

The online version has the following limitations compared to the PfP browser extension:

* Passwords cannot be filled in automatically, only copied to clipboard.
* The page doesn't know which website you are on, website has to be entered manually.
* Copying passwords to clipboard requires two clicks rather than one.
* Passwords will always stay unlocked until you reload the page or lock them manually.
* Setting up sync requires copying the authorization code manually.

## Getting your own copy {#install}

Download the `pfp-web-n.n.n.zip` file for our [latest release](https://github.com/palant/pfp/releases/tag/v2.2.6). Unpack the archive to some directory and double-click the `index.html` file in that directory. This should open PfP in your browser. Make sure that the page address starts with `file:///` meaning that PfP is being loaded from your computer rather than the web.
