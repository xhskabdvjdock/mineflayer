const mineflayer = require('mineflayer')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// خادم ويب بسيط لإبقاء الخدمة تعمل
app.get('/', (req, res) => {
  res.send('البوت يعمل الآن!')
})

app.listen(port, () => {
  console.log(`خادم الويب يعمل على المنفذ ${port}`)
})

// إعدادات بوت ماين كرافت
const bot = mineflayer.createBot({
  host: 'theZ.aternos.me', 
  port: 25565,
  username: 'MyCloudBot',
  // auth: 'microsoft' // أضفه إذا كنت تستخدم حساب رسمي
})

bot.on('spawn', () => console.log('البوت دخل السيرفر!'))
bot.on('error', (err) => console.log('خطأ:', err))
// التعامل مع الأخطاء المفاجئة ومنع توقف البوت
bot.on('error', (err) => {
  if (err.code === 'ECONNRESET') {
    console.log('فقدنا الاتصال بالسيرفر، سنحاول مرة أخرى...');
  } else {
    console.log('حدث خطأ غير متوقع:', err);
  }
});

bot.on('end', () => {
  console.log('انتهى الاتصال، جاري إعادة التشغيل بعد 5 ثوانٍ...');
  setTimeout(() => {
    // هنا يمكنك وضع دالة لإعادة إنشاء البوت
  }, 5000);
});
