// ==UserScript==
// @name         LuckyWheel Loader by Dr. Ahmed Khaled
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Loader for LuckyWheel script (Auto-load + Ready Check)
// @author       Dr. Ahmed Khaled
// @match        *://*.centurygames.com/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      raw.githubusercontent.com
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const SCRIPT_URL = "https://raw.githubusercontent.com/AhmedKhaled2132003/luckywheel.user.js/main/luckywheel.user.js";

    console.log("⏳ LuckyWheel Loader started…");

    // انتظر اللعبة تكون جاهزة (NetUtils موجود)
    function waitForGameReady() {
        return new Promise(resolve => {
            const check = setInterval(() => {
                if (unsafeWindow?.NetUtils?.request) {
                    clearInterval(check);
                    console.log("✅ Game is ready!");
                    resolve();
                }
            }, 300);
        });
    }

    // تحميل سكربت LuckyWheel وتشغيله
    function loadLuckyWheel() {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: SCRIPT_URL,
                onload: function(res) {
                    try {
                        // نفذ الكود مباشرة في نفس scope
                        eval(res.responseText);
                        console.log("🎉 LuckyWheel Loaded Successfully!");
                        resolve();
                    } catch (e) {
                        console.error("❌ Error executing LuckyWheel:", e);
                        reject(e);
                    }
                },
                onerror: function() {
                    console.error("❌ Failed to download LuckyWheel script!");
                    reject();
                }
            });
        });
    }

    // التشغيل
    (async function() {
        console.log("⏳ Waiting for game to be ready...");
        await waitForGameReady();
        await loadLuckyWheel();
        console.log("🟢 LuckyWheel is ready! You can now press Start");
    })();

})();
