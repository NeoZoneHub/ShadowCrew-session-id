const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: Digital_Crew,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function SHADOWCREW_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Digital_Crew = Digital_Crew({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Chrome')
            });

            if (!Pair_Code_By_Digital_Crew.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Digital_Crew.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Digital_Crew.ev.on('creds.update', saveCreds);
            Pair_Code_By_Digital_Crew.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === 'open') {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_Digital_Crew.sendMessage(Pair_Code_By_Digital_Crew.user.id, { text: 'SHADOWCREW-MD~' + b64data });

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

                    await Pair_Code_By_Digital_Crew.sendMessage(Pair_Code_By_Digital_Crew.user.id, { text: SHADOWCREW_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Pair_Code_By_Digital_Crew.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    SHADOWCREW_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('Service restarted');
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }

    return await SHADOWCREW_MD_PAIR_CODE();
});

module.exports = router;