# Userscript Bridge Library 🚀

Welcome to the **Userscript Bridge Library**! This library facilitates communication between userscripts running on the same page using the `BroadcastChannel` API. Whether you need to request information about installed userscripts or broadcast details about your own script, this library provides a simple interface for achieving that.

## 📜 Overview

This library consists of two main classes:

1. **`Script`**: Handles sending information about the userscript and listening for messages.
2. **`Manager`**: Requests and processes information from other userscripts.

Additionally, utility functions are provided to build messages and retrieve script info.

## 📦 Installation

Simply include the library in your userscript. For example:

```javascript
// @require https://github.com/BBBaden-Moodle-userscripts/UserscriptBridgeLib/raw/main/userscriptBridge.lib.js
```

## 🛠️ Usage

### Script Class

The `Script` class is used to send details about your script and listen for incoming messages.

#### Example

```javascript
const connection = new Script();

// When needed, close the connection
// connection.close();
```

### Manager Class

The `Manager` class is used to request and fetch information about installed userscripts.

#### Example

```javascript
const connection = new Manager();

connection.fetchInstalledUserscripts().then((userscripts) => {
    console.log('Installed Userscripts:', userscripts);
});
```

## 🔧 Methods

### `Script` Methods

- **`sendInfo()`**: Sends details about the current userscript.
- **`close()`**: Closes the BroadcastChannel.

### `Manager` Methods

- **`fetchInstalledUserscripts()`**: Requests and retrieves details about installed userscripts.
- **`close()`**: Closes the BroadcastChannel.

## 🛠️ Utility Functions

### `buildMsg(type, data)`

Builds a message to be sent via BroadcastChannel.

**Parameters:**
- `type` - Type of the message.
- `data` - Data to be included in the message.

**Returns:** A message object.

### `info()`

Retrieves information about the current userscript.

**Returns:** An object containing script details such as name, namespace, version, etc.

## 💡 Tips

- Ensure your userscripts are running on the same page for them to communicate.
- Use the `Script` class to broadcast information and the `Manager` class to listen for that information.

## ✨ Attribution

This extension was originally made by [Black Backdoor](https://github.com/black-backdoor).
