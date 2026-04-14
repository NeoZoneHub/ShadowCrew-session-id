const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
        default: Digital_Crew,
        useMultiFileAuthState,
        jidNormalizedUser,
        Browsers,
        delay,
        makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
        if (!fs.existsSync(FilePath)) return false;
        fs.rmSync(FilePath, {
                recursive: true,
                force: true
        })
};
const {
        readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
        const id = makeid();
        async function SHADOWCREW_MD_QR_CODE() {
                const {
                        state,
                        saveCreds
                } = await useMultiFileAuthState('./temp/' + id)
                try {
                        let Qr_Code_By_Digital_Crew = Digital_Crew({
                                auth: state,
                                printQRInTerminal: false,
                                logger: pino({
                                        level: "silent"
                                }),
                                browser: Browsers.macOS("Desktop"),
                        });

                        Qr_Code_By_Digital_Crew.ev.on('creds.update', saveCreds)
                        Qr_Code_By_Digital_Crew.ev.on("connection.update", async (s) => {
                                const {
                                        connection,
                                        lastDisconnect,
                                        qr
                                } = s;
                                if (qr) await res.end(await QRCode.toBuffer(qr));
                                if (connection == "open") {
                                        await delay(5000);
                                        let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                                        await delay(800);
                                   let b64data = Buffer.from(data).toString('base64');
                                   let session = await Qr_Code_By_Digital_Crew.sendMessage(Qr_Code_By_Digital_Crew.user.id, { text: 'SHADOWCREW-MD~' + b64data });

                                   let SHADOWCREW_MD_TEXT = `
╭━━━━━━━━━━━━━━━━━━━━╮
┃  🔹 SESSION ACTIVE 🔹  ┃
┃  ✦ DigitalCrew-MD ✦   ┃
┃  ✦ OFFICIAL BOT ✦     ┃
╰━━━━━━━━━━━━━━━━━━━━╯

━━━━━━━━━━━━━━━━━━━

╭━━━━━━━━━━━━━━━━━━━━╮
┃  ⚙️ CONFIGURATION ⚙️  ┃
┃  ➤ Instance sélectionnée : DigitalCrew-MD
┃  ➤ Ajoute ton SESSION_ID sur Heroku 🔑
┃  ➤ Variable : SESSION_ID
╰━━━━━━━━━━━━━━━━━━━━╯

━━━━━━━━━━━━━━━━━━━

╭━━━━━━━━━━━━━━━━━━━━╮
┃  🌐 SUPPORT & LINKS 🌐  ┃
┃  ▶ YouTube : youtube.com/@Digitalcrew243 🎥
┃  ▶ Owner : +998 771529519 👤
┃  ▶ Repo : https://github.com/NeoZoneHub-MD/ShadowCrew_MD 💻
┃  ▶ WhatsApp Group :
┃    https://chat.whatsapp.com/LlvGyc3ejMwJoPKguKT2Is?mode=gi_t 💬
┃  ▶ WhatsApp Channel :
┃    https://whatsapp.com/channel/0029VbBT7FdLCoX1TDyQQb1B 📢
╰━━━━━━━━━━━━━━━━━━━━╯

━━━━━━━━━━━━━━━━━━━

⚡ DigitalCrew — Build. Automate. Dominate. 🤖🔥

⭐ Pense à laisser une étoile sur le repo pour soutenir le projet
______________________________`;
         await Qr_Code_By_Digital_Crew.sendMessage(Qr_Code_By_Digital_Crew.user.id,{text: SHADOWCREW_MD_TEXT},{quoted:session})



                                        await delay(100);
                                        await Qr_Code_By_Digital_Crew.ws.close();
                                        return await removeFile("temp/" + id);
                                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                                        await delay(10000);
                                        SHADOWCREW_MD_QR_CODE();
                                }
                        });
                } catch (err) {
                        if (!res.headersSent) {
                                await res.json({
                                        code: "Service is Currently Unavailable"
                                });
                        }
                        console.log(err);
                        await removeFile("temp/" + id);
                }
        }
        return await SHADOWCREW_MD_QR_CODE()
});
module.exports = router