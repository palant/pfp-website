---
title: Keyboard navigation
image: access_keys_small.png
description: PfP can be used efficiently with keyboard only. Use Ctrl+Shift+F to open the pop-up and navigate lists using arrow keys.
---

## Opening the pop-up

The default shortcut key to open the PfP pop-up is Ctrl+Shift+F. It might happen that this shortcut key doesn't work, because of either the browser itself or another extension claiming it. The good news is: you can change it to whatever you like! The bad news: browsers hide this configuration interface pretty well.

* On Chrome and Opera the easiest way to get there is typing `chrome://extensions/shortcuts` into the address bar.
* On Firefox you go to `about:addons` and click the "Tools" cogwheel. You will find the option "Manage Extension Shortcuts" there. See also the [official and slightly more detailed explanation](https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox).

## Accepting or rejecting current screen

Finished typing you master password? No need to hunt for the "Access passwords" button, just press the Enter key. It's similar on any other screen asking you to enter data (e.g. "Generate new password") or to accept something ("Do you really want to remove this password?"), pressing Enter will let you continue.

Don't want to continue? You don't need to click the Cancel/Close button, pressing Esc key will do as well. *Note*: This doesn't work in Firefox, the developers decided to [make it impossible for extensions to intercept the Esc key](https://bugzilla.mozilla.org/show_bug.cgi?id=1443758). So pressing Esc will always close the pop-up.

## Navigating lists

Clickable elements in PfP can always be navigated using Tab and Shift+Tab keys, like you could on a regular website. In addition, you can use arrow and Home/End keys to navigate lists. Once you have the right element selected, press Enter to trigger it. This works for example for:

* List of passwords (allows selecting both a password and an action on a password)
* Suggestions when selecting a site
* Items in the password menu

In addition, you can use Ctrl+↑ and Ctrl+↓ to switch tabs in the pop-up conveniently.

## Triggering any element directly

Want to press a button or navigate to a text field with a single key combination? Press Alt key and hold. PfP will show you the access keys for all elements.

{{< img src="access_keys.png" alt="Access keys showing up for all elements" width="612" />}}

Here, the right combination to generate a new password is Alt+G (note the letter "G" being underlined in "Generate new password"). If you want to switch to settings, press Alt+T (note the letter "T" being displayed on top of the "Settings" icon).

## Filling in a password with keyboard only

Let's combine all this to see how you would fill in a password on a website with keyboard only:

* Press Ctrl+Shift+F to open PfP pop-up.
* If passwords are locked: enter your master password and press Enter.
* "Fill in" action of the first password in the list will already be selected. If you want to fill in another password, press ↓ key the required number of times.
* Press Enter to trigger "Fill in" action.
