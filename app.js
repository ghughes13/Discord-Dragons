const Discord = require("discord.js");
const client = new Discord.Client();

const start = require("./commands/characterInit");
const hunt = require("./commands/hunt");
const shop = require("./commands/shop/shop");
const buy = require("./commands/shop/buy");

require("dotenv").config();

client.once("ready", () => {
  console.log("running");
});

client.on("message", (msg) => {
  msg.content = msg.content.toLowerCase();
  msgContentSplit = msg.content.split(" ");

  if (msg.content.startsWith(">>")) {
    if (msgContentSplit[1] === "start") {
      start.start(msg);
    } else if (msgContentSplit[1] === "hunt") {
      hunt.hunt(msg);
    } else if (msgContentSplit[1] === "shop") {
      shop.shop(msg);
    } else if (msgContentSplit[1] === "buy") {
      buy.buy(msg);
    }
  }
});

client.login(process.env.BOT_TOKEN);
