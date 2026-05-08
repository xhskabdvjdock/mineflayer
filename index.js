const mineflayer = require('mineflayer');
const keepAlive = require('./keep_alive');

// تشغيل خادم الويب
keepAlive();

const bot = mineflayer.createBot({
  host: 'theZ.aternos.me', // آي بي السيرفر
  port: 51580,
  username: 'Replit_Bot',
});

bot.on('spawn', () => {
  console.log('تم دخول البوت بنجاح من Replit!');
});

// لمنع توقف الكود عند حدوث خطأ بسيط
bot.on('error', (err) => console.log(err));
