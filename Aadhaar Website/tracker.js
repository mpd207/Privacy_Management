(function () {

    console.log("Tracking system initializing...");

    const TRACKING_ENDPOINT = "http://localhost:3000/track";

    function generateUID() {
        return 'aadhaar-' + crypto.randomUUID();
    }

    function getOrCreateUID() {

        let uid = localStorage.getItem("aadhaar_uid");

        if (!uid) {

            uid = generateUID();

            localStorage.setItem("aadhaar_uid", uid);

            document.cookie =
                "aadhaar_uid=" + uid +
                "; expires=Fri, 31 Dec 2038 23:59:59 UTC; path=/";

            console.log("New user tracked:", uid);

        } else {

            console.log("Returning user identified:", uid);

        }

        return uid;
    }

    function collectFingerprint() {

        return {

            userAgent: navigator.userAgent,

            screenResolution:
                screen.width + "x" + screen.height,

            timezone:
                Intl.DateTimeFormat().resolvedOptions().timeZone,

            language:
                navigator.language,

            platform:
                navigator.platform,

            cookieEnabled:
                navigator.cookieEnabled

        };
    }

    async function sendTrackingData(uid, fingerprint) {

        try {

            await fetch(TRACKING_ENDPOINT, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    uid: uid,

                    timestamp: new Date().toISOString(),

                    fingerprint: fingerprint

                })

            });

            console.log("Tracking data sent");

        } catch (e) {

            console.log("Tracking server unavailable");

        }

    }

    const uid = getOrCreateUID();

    const fingerprint = collectFingerprint();

    sendTrackingData(uid, fingerprint);

})();