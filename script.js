import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9BmV4XKXuMWa4PZHpb7Bbt-rHs61m3lE",
  authDomain: "absensi-polri.firebaseapp.com",
  databaseURL: "https://absensi-polri-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "absensi-polri",
  storageBucket: "absensi-polri.firebasestorage.app",
  messagingSenderId: "19006760644",
  appId: "1:19006760644:web:b980f54aea123e92ed4b91",
  measurementId: "G-LYZDWFMMV5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.addExp = async () => {
    const admin = document.getElementById('adminName').value;
    const user = document.getElementById('username').value;
    const userId = document.getElementById('userId').value;
    const amount = parseInt(document.getElementById('expAmount').value);
    const before = document.getElementById('beforeData').value;
    const after = document.getElementById('afterData').value;
    const status = document.getElementById('status-msg');

    const now = new Date();
    const timeString = now.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

    try {
        // 1. Simpan ke Firebase Realtime Database
        await update(ref(db, 'players/' + userId), {
            username: user,
            exp: amount,
            lastUpdated: timeString
        });

        // 2. Kirim Webhook ke Discord
        await fetch('https://discord.com/api/webhooks/1522062060157145118/Of9cNDI0OPXu8mI0Lo0BMNzUe0OcXdIPd3UNpQ0-GQtr1US7ty9IMfIq_z7W2PFtGmVp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                embeds: [{
                    title: `GIVE | ${amount} EXP`,
                    color: 0x00FF00,
                    description: 
                        `**Admin:** ${admin}\n` +
                        `**Target:** ${user} (${userId})\n` +
                        `**Mode:** OFFLINE\n` +
                        `**Before:** ${before}\n` +
                        `**After:** ${after}\n` +
                        `**Time:** ${timeString}`
                }]
            })
        });

        status.innerText = "Data berhasil disimpan & terkirim!";
        status.style.color = "#4ecca3";
    } catch (e) {
        status.innerText = "Error: " + e.message;
        status.style.color = "red";
    }
};
          
