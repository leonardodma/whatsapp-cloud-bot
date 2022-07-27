const { createBot } = require("whatsapp-cloud-api");
require("dotenv").config();

(async () => {
  try {
    const from = process.env.FROM_NUMBER;
    const token = process.env.ACCESS_TOKEN;
    const to = process.env.TO_NUMBER;
    const webhookVerifyToken = process.env.WEBHOOK_VERIFICATION_TOKEN;

    const bot = createBot(from, token);
    const result = await bot.sendText(to, "Hello world");

    // Start express server to listen for incoming messages
    await bot.startExpressServer({
      webhookVerifyToken,
    });

    // Listen to ALL incoming messages
    bot.on("message", async (msg) => {
      console.log(msg);

      if (msg.type === "text") {
        await bot.sendText(msg.from, "Received your text message!");
      } else if (msg.type === "image") {
        await bot.sendText(msg.from, "Received your image!");
      }
    });
  } catch (err) {
    console.log(err);
  }
})();
