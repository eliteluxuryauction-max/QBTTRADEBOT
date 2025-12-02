import TelegramBot from "node-telegram-bot-api";
import express from "express";

const app = express();
const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💰 Launch Sniper", callback_data: "launch_sniper" }],
        [{ text: "📈 Chart", callback_data: "locked" }],
        [{ text: "💼 Wallets", callback_data: "locked" }],
        [{ text: "⚙️ Settings", callback_data: "locked" }]
      ]
    }
  };
  bot.sendMessage(chatId, "Welcome to QBTTrade Bot!\nLaunch Sniper to unlock full access 🔓", opts);
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  if (query.data === "launch_sniper") {
    bot.sendMessage(chatId, "🚀 Use the bot launch tool...");
  } else {
    bot.sendMessage(chatId, "⚠️ Launch Sniper to have full access.");
  }
});

app.get("/", (req, res) => {
  res.send("🚀 QBT Trade Bot is Live!");
});

app.listen(process.env.PORT || 10000, () => {
  console.log("🌐 Flask-like server running...");
});
