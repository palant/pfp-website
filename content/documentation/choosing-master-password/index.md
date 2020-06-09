---
title: "Choosing a master password"
date: 2018-03-08
---

A strong master password is the main protection of the data you store in PfP. With common passwords and dictionary words too easy to guess, you should go for something better.

When setting a new master password, PfP will aid you by indicating the strength of your chosen password. Red means a very weak password, green a good one. PfP will also recognize some common passwords and flag them as weak.

{{< toc >}}

## Why master password strength is important

As you use PfP, you will likely generate passwords for many websites. Not all of these websites do a good job protecting your data, eventually some of them will be hacked and the bad guys will get one of your generated passwords. The good news: you used that password on one site only, so none of your other accounts will be compromised directly. You are much better off than people who don't use password managers, they will typically use the same password on a large number of websites and a single hack will expose dozens of accounts. The bad news: the bad guys could now try to guess your master password. If they succeed, they will be able to generate your passwords for other websites. So we definitely don't want them to succeed.

That's why PfP uses a password generation approach that is hard to speed up. When you generate a password, it takes a split second which doesn't seem like a big deal. But the bad guys will want to test millions if not billions of guesses for your master password, and that slow password generation will make it take a long time, ideally way too long to be doable. But your master password has to be hard to guess. The immensely popular `password1` will be guessed within a minute no matter what PfP does to protect your password.

## How to know whether the password is good enough

There is a password strength indicator when you set your master password in PfP. You should try to make all bars light up green, these passwords should be strong enough even against the most determined attackers. Note that this indicator isn't perfect however and you should still read the next section. While it will check your password against a list of common passwords, it doesn't know your dog's name whereas somebody trying to crack your passwords might.

{{< img src="master-password.png" alt="Long master password with all bars green" width="594" />}}

Concerned that you won't be able to remember such a long password? You can write it down at first. Since you will likely be typing this password multiple times per day, your written note should become unnecessary very soon.

## What to avoid in your password

As a rule, you should try to avoid anything as elements of your password that would be easy to guess, for example:

* Your birth date or birth date of people near to you
* People's names
* Parts of your address
* Dictionary words in any language
* Dictionary words obfuscated with well-known approaches, such as spelling them backwards or replacing vowels by digits
* Phrases from your favorite books, songs etc.

Most importantly however, you should choose a password that you **don't use anywhere else**.

## How to choose a strong password

There are plenty of different suggestions online on choosing strong passwords. For example, [this article by University of California](https://it.ucsf.edu/policies/choose-right-password) gives good advise.

## How do I change my master password?

Starting with PfP 2.1.0, a backup can be imported even if it was created with a different master password. This allows changing your master password:

* Click PfP icon and log in.
* Click "Show all passwords."
* Click the backup button and save a backup with your passwords.
* Click PfP icon again and "Lock passwords."
* Click "Reset master password" and choose a new master password (this **removes all existings passwords**).
* Click "Show all passwords."
* Click the import button and restore the backup file you created previously.
* When prompted, enter your old master password which will be used to decrypt the backup file.

The side-effect is that all generated passwords will be converted into stored passwords because password generation depends on the master password. It is recommended that you replace these passwords by new generated passwords.
