---
title: Generated or stored password?
image: password-type.png
description: Generated passwords aren't saved to disk but rather calculated whenever they are needed. What are the implications in practice?
---

## Why generate passwords?

The most obvious advantage of generated passwords is being able to recover them easily. Generated passwords can be recovered even [if you had no backup whatsoever](/documentation/recovery-strategies/). They are also easiest to recover from paper backups. While paper backups also contain a recovery code for stored passwords, entering a lengthy code into PfP isn't easy. Generated passwords are also impossible to guess for somebody trying to get access to your account. Finally, with generated passwords you never need to see your password, meaning that somebody watching over your shoulder won't see it either.

## And the disadvantages?

In theory, if somebody gets hold of your generated passwords, they can try to guess your master password which would allow them generating more passwords for your accounts. This makes it essential that you [choose a strong master passwords](/documentation/choosing-master-password/). A weak master password would compromise encryption of stored passwords as well however, so you should always make sure that yours isn't guessed easily.
