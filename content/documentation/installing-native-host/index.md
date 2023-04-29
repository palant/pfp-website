---
title: "Installing native host application"
date: 2023-04-26T09:28:21Z
---

Starting with PfP 3.0, the application PfP Native Host has to be installed for PfP to work. This application provides the extension with access to configured KeePass password databases.

The application is designed to require no dependencies, it doesn’t need to be installed in a particular folder and doesn’t require special privileges. You merely need to download a file and to run it once for the initial setup.

With the application not being signed, the download process is non-trivial on some operating systems. That’s why I provide scripts that you can run to automate the process.

{{< toc >}}

## Installing

### Windows

The following script will install PfP Native Host in your Downloads folder. To run it, copy the script. Then press the Windows key and type “powershell.”

{{< img src="winmenu.png" width="464" alt="Windows menu showing “Windows PowerShell” as best match." />}}

Click “Windows PowerShell” to start it. Then right-click the PowerShell window to paste the script. You might still need to press Enter for PowerShell to exit.

```powershell
$Shell = New-Object -ComObject Shell.Application
$Downloads = $Shell.NameSpace('shell:Downloads').Self.Path
Invoke-WebRequest `
  -Uri 'https://github.com/palant/pfp-native-host/releases/download/v1.1/pfp-native-host-windows.exe' `
  -OutFile "$Downloads\pfp-native-host.exe"
Start-Process -FilePath "$Downloads\pfp-native-host.exe"
exit
```

### Linux

The following script will install PfP Native Host in your Downloads folder. To run it, copy the script. Then open a Terminal window, paste the script (e.g. by right-clicking the window and choosing “Paste” from the context menu) and press Enter.

```sh
curl -L \
  https://github.com/palant/pfp-native-host/releases/download/v1.1/pfp-native-host-linux \
  -o $HOME/Downloads/pfp-native-host
chmod 755 $HOME/Downloads/pfp-native-host
$HOME/Downloads/pfp-native-host
```

### macOS

The following script will install PfP Native Host in your Downloads folder. To run it, copy the script. Then open the Terminal app, paste the script via Edit > Paste menu and press Enter. Note that there will be a confirmation prompt because the application is not signed and has to be added to the allow list.

```sh
curl -L \
  https://github.com/palant/pfp-native-host/releases/download/v1.1/pfp-native-host-macos \
  -o $HOME/Downloads/pfp-native-host
chmod 755 $HOME/Downloads/pfp-native-host
spctl --add $HOME/Downloads/pfp-native-host
$HOME/Downloads/pfp-native-host
```

### Manual installation

For manual installation, download the application binary for your operating system from the [release page](https://github.com/palant/pfp-native-host/releases/latest). Once the download is complete, run the application to start initial setup. Since the application is not signed, there might be a number of warnings depending on your operating system.

## Initial setup

The initial setup has two purposes: selecting database files to be used and making sure browsers know where PfP Native Host is located. You can select an option by using arrow keys and pressing Enter. You can exit the application by pressing Esc.

{{< img src="initial-setup.png" width="548" alt="Terminal window displaying the text: “No databases configured, you need to add a database. If you already have a KeePass database, this application can use it.” Two options are being displayed below: “Select an existing database” and “Create a new database.”" />}}

If you don’t have a KeePass passwords database already (e.g. one created by KeePass or KeePassXC), the application will guide you through the process of creating a new database and setting up a secure passphrase.

After that it will let you configure browsers. Select any browsers that you have PfP installed in, they will all connect to the same PfP Native Host application.

You can always repeat the setup later if you want to use a different database, switched browsers or moved PfP Native Host to a different location and need to let browsers know.
