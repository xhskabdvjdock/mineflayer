const mineflayer = require('mineflayer');

const botOptions = {
    host: 'theZ.aternos.me', // ضع هنا الـ IP
    port: 51580,                // البورت
    username: 'Ali_Bot_121',    // اسم البوت
    version: '1.21.1',          // تحديد الإصدار ضروري جداً هنا
    hideErrors: false           // لإظهار تفاصيل الخطأ إن حدث
};

let bot;

function createBot() {
    console.log('🔄 جاري بدء الاتصال بإصدار 1.21.1...');
    bot = mineflayer.createBot(botOptions);

    // عند الدخول بنجاح
    bot.on('spawn', () => {
        const pos = bot.entity.position;
        console.log(`✅ البوت دخل السيرفر! مكانه الحالي: ${pos}`);
    });

    // الرد على الرسائل
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === 'ping') {
            bot.chat('pong!');
        }
    });

    // معالجة الأخطاء ومنع الانهيار
    bot.on('error', (err) => {
        console.log('❌ خطأ في الاتصال:');
        console.error(err);
    });

    // إعادة الاتصال التلقائي في حال تم طرد البوت أو أغلق السيرفر
    bot.on('end', (reason) => {
        console.log(`⚠️ تم قطع الاتصال بسبب: ${reason}`);
        console.log('🔄 سيتم إعادة المحاولة بعد 10 ثوانٍ...');
        setTimeout(createBot, 10000);
    });
}

createBot();
