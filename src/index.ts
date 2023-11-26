import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  Client,
} from "discord.js";
import { isOfCommands } from "./commands";
import config from "./config.json";
import { modalResponse, setupModalSubmit } from "./verificationModal";

const TOKEN = config.TOKEN;

const client = new Client({
  intents: ["Guilds"],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is online`);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) chatInput(interaction);
  else if (interaction.isButton()) buttonInp(interaction);
});

async function chatInput(interaction: ChatInputCommandInteraction) {
  const { commandName } = interaction;
  if (!isOfCommands(commandName))
    return console.error(`command ${commandName} is not a command`);
  // await commands[commandName].execute(interaction);
}

function buttonInp(interaction: ButtonInteraction) {
  if (interaction.customId !== "verificationBtn") return;
  setupModalSubmit(interaction);
  modalResponse(interaction);
}

client.login(TOKEN);
