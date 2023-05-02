---
title: Recovery codes
date: 2018-03-08
---

What if your passwords database ever gets corrupted? Ideally, you should have a backup. Yet restoring from backup can also fail, and some passwords are too important to take that risk. That’s what recovery codes are for: to provide a printed backup for your most important passwords.

{{< toc >}}

## Creating a paper backup

Usually, you will have too many passwords to print recovery codes for all of them. The easiest solution is marking the truly essential passwords with some tag like “essential.” For that, click the password menu icon (three vertical dots) for the password and choose “Edit password” from the menu. Enter the tag into the respective field and click “Save password.”

Now click “Show all passwords” in the PfP pop-up on any website. On that page select the tag you used under “Filters.” Now only the password with this tag will be displayed and printed.

Click “Show recovery codes” to generate recovery codes. You need to enter a password to protect recovery codes with, typically it will be your main password. That’s it, recovery codes now show up and can be printed:

{{< img src="recovery-codes.png" width="511" alt="Passwords blabber and blubber for the site heise.de. For both passwords, a recovery code shows up: five lines of upper-case letters and digits, in groups of four letters separated with hyphens and colons." />}}

## Restoring a password from paper backup

If you want to use a recovery code, open the website that the password belongs to and click the PfP icon. Now you can click “Add password.”

Instead of generating a password or entering it manually, click “Use recovery code.” Now you’ll have a field to enter the recovery code and the password it has been protected with. Once done, click “Decrypt recovery code” and the decrypted password will be entered into the “Password” field.

*Note*: You don’t need to enter the separators when entering the recovery code. Only enter the letters and digits, the recovery code will be formatted correctly automatically.

## How are recovery codes safe to print?

A recovery code encodes an *encrypted* password. The encryption key is derived from the protection password, exactly like the database encryption key is derived from your main password.

PfP makes sure to use the same protection level for recovery codes as for the password database itself. So as long as your main password is [strong enough that your database cannot be decrypted by an attacker](/documentation/choosing-main-password/#how-to-choose-a-truly-strong-password), the same will be true for recovery codes.
