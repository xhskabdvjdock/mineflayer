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
  port: 51580,
  username: 'MyCloudBot',
  // auth: 'microsoft' // أضفه إذا كنت تستخدم حساب رسمي
})

bot.on('spawn', () => console.log('البوت دخل السيرفر!'))
bot.on('error', (err) => console.log('خطأ:', err))
