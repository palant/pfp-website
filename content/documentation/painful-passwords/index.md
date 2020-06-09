---
title: "What's so painful about passwords?"
image: password-rules.png
date: 2018-02-14
---

Why is this tool's name stressing the pain of using passwords? The reason is that passwords are currently designed for robots with infinite and infallible memory, not humans. No person can come up with strong individual passwords for every website and remember them.

Actual people will resort to various strategies to cope with this situation. Usually it boils down to reusing passwords between websites and/or overusing "Forgot password" feature. Both have considerable security drawbacks.

{{< toc >}}

## Too many passwords to remember

How many online accounts do you have? It's likely at least a few dozen. Can you remember so many different passwords? Unlikely. Most people will use a handful or even one password for all these accounts. Password reuse isn't great for security however. Often one of your passwords will leak via a seemingly unimportant site, and the bad guys will always try out the same password with your other accounts. Compared to password reuse, writing down passwords is the lesser evil. PfP reduces all this complexity to a single password.

Various single sign-on solutions also seek to address this issue. For example, many websites will let you log in with your Facebook or Google account, thus reducing the number of passwords to remember. However, there are always websites that still need their own password. Also, signing in with Facebook gives Facebook insight into which websites you use how often, and similarly with Google of course. You probably don't want to give these companies even more data on your browsing habits. Not to mention that your Facebook or Google account becomes a single point of failure, once somebody breaks into this account they will gain access to many other accounts as well.

## Arbitrary complexity rules

Every website has its own rules for passwords. Some require that passwords contain all of lowercase and uppercase letters, numbers and special characters, others want you to change the password every few months and not reuse any of the passwords you used before. Each website has its own ideas about minimal and maximal password length. Fact is, [password complexity rules don't work](https://blog.codinghorror.com/password-rules-are-bullshit/). They are even counterproductive, as users will often resort to simple variations of a standard password or resetting passwords because they cannot remember them. In the end, by far the most important factor contributing to password strength is its length and not the few special characters. PfP will generate extremely strong passwords by default, and you can easily adjust password generation settings to match any website's complexity rules without making the password insecure.

{{< img src="password-rules.png" width="300" alt="A website enforcing particularly specific password rules" />}}

## Your email account is the single point of failure

Given all the issues, websites cannot expect people to remember their passwords. So a "Forgot password" feature is a necessary part of any website. Normally, it will give you access to the account if you demonstrate control of your email account. This makes email accounts a very attractive target, once somebody gets into the email account they will be able to control most other accounts as well. There is relatively little that PfP can do about it, but at least it will let you set a very strong password for the email account which isn't used anywhere else. This will hopefully be sufficient and this account will never be compromised.

## Security questions

Many websites will offer you security questions, supposedly as additional protection. What they actually do is [create a backdoor to your account](https://www.schneier.com/blog/archives/2005/02/the_curse_of_th.html), allowing account takeover because guessing answers to the security questions is too easy. So the recommendation for answering security questions is never giving a truthful answer but rather entering a random string. The problem with that: occasionally the website will ask you to answer one of these security questions, and you won't remember. PfP lets you store "answers" to security questions in the password notes.
