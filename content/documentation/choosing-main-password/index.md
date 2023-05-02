---
title: "Choosing a main password"
date: 2018-03-08
---

Should your passwords database ever fall into the wrong hands (e.g. because your sync storage is compromised), a strong main password will make sure its data cannot be decrypted. Common passwords and dictionary words are too easy to guess, you should go for something better.

So when creating a new database, PfP Native Host application will suggest creating a random passphrase for you. Such a passphrase is both easy to remember and secure, you should normally go with it.

{{< toc >}}

## Why main password strength is important

As long as you are the only person with access to your passwords database, the encryption of the passwords doesn’t really matter. This changes however as soon as you make a backup of the passwords database on some storage service. The service owner now has access to this file, as done anyone compromising the service. Now strong encryption is crucial, as it’s the only thing stopping someone else from accessing your data.

While an encryption key cannot usually be guessed directly, guessing you main password is more realistic. Once the guess is correct, the attackers will be able to derive the encryption key from it and decrypt the data. So it’s important to choose a main password that will take as long as possible to guess.

That’s harder than it sounds. It isn’t sufficient to merely choose a long password with different character classes. For example, `Password123!` will pass most password complexity requirements, yet it is still trivial to guess. The article [Password strength explained](https://palant.info/2023/01/30/password-strength-explained/) provides more details on the topic.

## How to choose a truly strong password

The only way to get a truly strong password is generating one randomly. The issue is: a password like `gv*=52!W` is rather hard to remember.

Our brains are much better at remembering passphrases like `limb emit rank error gala`. This passphrase has the same strength as the password above, but it is much easier to remember.

PfP Native Host application will automatically generate a passphrase for you when you create a new database. It’s using short words only, making the passphrase easy to remember and to type. A five words passphrase is safe enough for most purposes. If you want extra protection, you can add one more word. And seven words are only necessary for people concerned that a nation-state might go after them and throw massive resources at guessing their password.
