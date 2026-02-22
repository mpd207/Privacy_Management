console.log("Privacy Layer ACTIVE - HARD MODE");

/* RANDOMIZER */
function randomUID() {
    return "anon_" + Math.random().toString(36).substring(2, 12);
}

/* 1️⃣ Override crypto.randomUUID */
if (window.crypto && crypto.randomUUID) {

    crypto.randomUUID = function () {

        const fake = randomUID();

        console.log("Blocked randomUUID ->", fake);

        return fake;
    };
}

/* 2️⃣ Override Date.now (if timestamp used for UID) */
const originalNow = Date.now;

Date.now = function () {
    return originalNow(); // or randomize if needed
};

/* 3️⃣ Override setInterval if tracking loop */
const originalSetInterval = window.setInterval;

window.setInterval = function (fn, delay) {

    console.log("Intercepted setInterval:", delay);

    // Block suspicious 1000ms trackers
    if (delay === 1000) {
        console.log("Blocked 1s tracking interval");
        return null;
    }

    return originalSetInterval(fn, delay);
};

/* 4️⃣ Block fetch tracking calls */
const originalFetch = window.fetch;

window.fetch = function (...args) {

    if (typeof args[0] === "string" &&
        args[0].includes("track")) {

        console.log("Blocked tracking fetch call");
        return Promise.resolve(new Response("{}"));
    }

    return originalFetch.apply(this, args);
};

/* 5️⃣ Mask fingerprint */
Object.defineProperty(navigator, "userAgent", {
    get: () => "PrivacyBrowser"
});
