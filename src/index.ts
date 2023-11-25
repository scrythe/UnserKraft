import { Client } from "discord.js";
import { commands, isOfCommands } from "./commands";
import config from "./config.json";

const TOKEN = config.TOKEN;

const client = new Client({
  intents: ["Guilds"],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is online`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  if (!isOfCommands(commandName))
    return console.error(`command ${commandName} is not a command`);
  await commands[commandName].execute(interaction);
});

client.login(TOKEN);
