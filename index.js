const mineflayer = require('mineflayer');
const express = require('express');

// ==========================================
// 1. إعداد خادم الويب (مطلوب لمنصة Render)
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('البوت يعمل الآن على Render!');
});

app.listen(PORT, () => {
    console.log(`🌐 خادم الويب يعمل على المنفذ ${PORT} (تم تلبية شرط Render)`);
});

// ==========================================
// 2. إعدادات بوت ماين كرافت
// ==========================================
const botOptions = {
    host: 'theZ.aternos.me', // رابط السيرفر
    //port: 51580,             // البورت الخاص بالسيرفر
    username: 'Ali_Bot',     // اسم البوت
    version: '1.21.1',       // تحديد الإصدار 1.21.1
    hideErrors: false
};

let bot;

function createBot() {
    console.log('🔄 جاري بدء الاتصال بسيرفر Aternos...');
    bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log('✅ البوت دخل السيرفر بنجاح!');
        
        // جعل البوت يقفز كل فترة حتى لا يطرده السيرفر بسبب الـ AFK
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000); // يقفز كل 30 ثانية
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === 'ping') {
            bot.chat('pong!');
        }
    });

    bot.on('error', (err) => {
        console.log('❌ حدث خطأ:', err.message);
    });

    bot.on('end', (reason) => {
        console.log(`⚠️ تم قطع الاتصال. السبب: ${reason}`);
        console.log('🔄 سيتم محاولة إعادة الاتصال بعد 15 ثانية...');
        setTimeout(createBot, 15000);
    });
}

// تشغيل البوت
createBot();
