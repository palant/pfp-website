---
title: Data synchronization
description: PfP can synchronize data between multiple devices. How does that work and is it safe?
---

## If PfP doesn't have a server, how can it sync data?

For data synchronization, PfP uses your account at a storage provider like Dropbox. You grant PfP limited access to that account, and PfP will regularly upload its backup file. This file is fully encrypted, same as your manual backup.

## Can PfP read my files?

No. PfP requests access only to its own folder at your storage provider. All it can do is read and write files in that folder. In fact, it will only access the file `passwords.json` there.

## I only installed PfP in one browser, do I need this functionality?

Even without multiple devices, this functionality can be useful. Essentially, it is an automatic backup of your data. If your PfP data is ever lost, you can set up sync again and all your passwords will be recreated. Alternatively, you can download the file from your storage provider manually and import it into PfP.

## How often does PfP update my data?

Assuming that you are online, your data will be synchronized with the remote storage every hour. If you want the upload to happen earlier, you can always click "Show sync state" and press "Update now" button there to trigger a sync manually.

## What if I change passwords on multiple devices at the same time?

Sync doesn't merely replace passwords, it will merge changes intelligently. So if you add one password on one device and another password on another, after syncing you will get both passwords on all devices. On the other hand, if you change the *same* password on multiple devices, this conflict cannot be resolved without data loss and whichever device syncs last will win.

## What will the storage provider (e.g. Dropbox) see?

The file uploaded to the storage is fully encrypted. So as long as you [choose a strong master password](/documentation/choosing-master-password), your storage provider will not be able to see any of your data. However, even without decrypting the data the storage provider will know how many passwords for how many websites (*not* which websites) you have. They will also know that you use PfP and how many devices you are synchronizing.
