import { Client, Collection } from "discord.js";
import { commands, isOfCommands } from "./commands";
import config from "./config.json";

const TOKEN = config.TOKEN;

// const clientCommands = new Collection();
// commands.forEach((command) => command.data.name, commands);

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
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
  await interaction.followUp("aah");
});

client.login(TOKEN);
