# 🛡 Aadhaar Privacy Layer (Browser-Based Tracking Mitigation)

## 📌 Overview

This project demonstrates how browser-level client-side tracking can be intercepted and neutralized using a Chrome Extension.

It simulates a tracking system (Aadhaar Portal clone running locally) that:

* Generates a persistent UID
* Collects browser fingerprint data
* Sends periodic tracking data to a server

The Privacy Layer extension intercepts and modifies these tracking mechanisms in real time.

---

## 🎯 Research Objective

To demonstrate:

1. How modern web applications generate persistent identifiers.
2. How browser fingerprinting works.
3. How client-side JavaScript APIs can be overridden.
4. The effectiveness and limitations of browser-level privacy defense.

---

## 🧪 Test Environment

* Local test portal: `http://127.0.0.1:5500`
* Browser: Google Chrome
* Extension Type: Manifest V3
* Execution mode: `document_start`

---

## 🔎 Tracking Mechanisms Simulated

The portal attempts to:

* Generate UID using:

  ```js
  crypto.randomUUID()
  ```

* Store identifiers via:

  ```js
  localStorage.setItem()
  document.cookie
  ```

* Collect fingerprint data:

  * `navigator.userAgent`
  * `screenResolution`
  * `timezone`
  * `language`
  * `platform`

* Send data repeatedly using:

  ```js
  setInterval()
  fetch()
  ```

---

## 🛡 Privacy Layer Architecture

The extension works by injecting a script into the **page context** (not extension context).

### 1️⃣ manifest.json

* Uses `content_scripts`
* Injects at `document_start`
* Declares `web_accessible_resources`
* Grants host permission to local test site

### 2️⃣ content.js

Injects `inject.js` directly into page DOM:

```js
const script = document.createElement("script");
script.src = chrome.runtime.getURL("inject.js");
document.documentElement.prepend(script);
```

This bypasses Chrome's isolated world.

### 3️⃣ inject.js (Core Protection Logic)

Overrides critical tracking APIs:

#### 🔹 crypto.randomUUID()

Returns randomized anonymized ID.

#### 🔹 Storage.prototype.setItem()

Intercepts UID storage attempts.

#### 🔹 document.cookie setter

Prevents persistent identifier cookies.

#### 🔹 window.setInterval()

Blocks suspicious 1-second tracking loops.

#### 🔹 window.fetch()

Intercepts outbound tracking calls.

#### 🔹 navigator.userAgent

Masks fingerprint string.

---

## ⚙️ Installation

1. Open Chrome
2. Navigate to:

```
chrome://extensions
```

3. Enable Developer Mode
4. Click “Load unpacked”
5. Select project folder

---

## 📁 Extension Folder

The standalone Chrome extension files are available in:

`../privacy-extension/`

Files:

* `manifest.json`
* `content.js`
* `inject.js`

---

## 🧪 Testing Procedure

### Without Extension

Observed behavior:

* Persistent UID
* Identical UID across refresh
* Full fingerprint exposed
* Tracking every 1 second

Example:

```json
{
  "uid": "aadhaar-525f88f6-...",
  "fingerprint": {
    "userAgent": "...Chrome...",
    "screenResolution": "1536x864"
  }
}
```

---

### With Privacy Layer Enabled

Expected behavior:

* UID randomized
* Fingerprint masked
* Tracking fetch calls blocked
* No persistent identifier

Example:

```json
{
  "uid": "anon_k39d82js"
}
```

Console should show:

```
Privacy Layer ACTIVE - HARD MODE
Blocked randomUUID
Blocked tracking fetch call
```

---

## 🧠 Security Insights

### ✔ What Can Be Blocked

* Client-side UID generation
* Local storage persistence
* Cookie-based tracking
* JS-based fingerprinting
* Repeated tracking loops

### ❌ What Cannot Be Fully Blocked

* Server-side generated identifiers
* IP-based tracking
* TLS fingerprinting
* Advanced browser entropy fingerprinting
* Extension detection techniques

---

## 📚 Academic Relevance

This project demonstrates concepts relevant to:

* Web Security
* Browser Internals
* Client-Side Exploitation
* Privacy Engineering
* Fingerprinting Defense Mechanisms
* Cybersecurity Research

---

## 🔬 Research Value

This project shows that:

* Client-side tracking is often trivial to bypass.
* Most tracking relies heavily on browser-exposed APIs.
* Extensions can meaningfully disrupt naïve tracking systems.
* True privacy requires multi-layer defense (browser + network + server-side controls).

---

## ⚠️ Disclaimer

This project is for academic and cybersecurity research purposes only.

Do not deploy API overriding extensions on production government or sensitive websites.

---

## 👩‍💻 Author

Cybersecurity student researching:

* Browser privacy
* Tracking mitigation
* Web exploitation
* Defensive JavaScript instrumentation

---
