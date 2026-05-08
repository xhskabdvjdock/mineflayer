const mineflayer = require('mineflayer');

// إعدادات البوت - غير البيانات هنا حسب سيرفرك
const botOptions = {
    host: 'آي_بي_السيرفر_هنا', 
    port: 25565,
    username: 'Ali_Bot',
    // version: '1.20.1' // فك التعليق عنها وحدد الإصدار إذا لزم الأمر
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log('✅ البوت دخل السيرفر بنجاح!');
        bot.chat('أهلاً بالجميع، أنا بوت يعمل من Replit!');
    });

    // التعامل مع خطأ ECONNRESET وغيره من الأخطاء
    bot.on('error', (err) => {
        console.log('❌ حدث خطأ في الاتصال:', err.code);
        if (err.code === 'ECONNRESET') {
            console.log('السيرفر قطع الاتصال فجأة، قد يكون بسبب الحماية أو الإصدار.');
        }
    });

    // إعادة الاتصال تلقائياً عند الخروج
    bot.on('end', () => {
        console.log('⚠️ تم قطع الاتصال، جاري إعادة المحاولة بعد 10 ثوانٍ...');
        setTimeout(createBot, 10000); 
    });

    // رد فعل بسيط للبوت
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === 'hello') {
            bot.chat(`أهلاً بك يا ${username}!`);
        }
    });
}

// تشغيل البوت لأول مرة
createBot();
