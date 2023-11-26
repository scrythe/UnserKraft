import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
} from "discord.js";
import config from "./config.json";

const { TOKEN, CHANNELID } = config;

const client = new Client({
  intents: ["Guilds"],
});

client.on("ready", () => {
  const channel = client.channels.cache.get(CHANNELID);
  if (!channel) return;
  if (!channel.isTextBased()) return;
  const verification = new ButtonBuilder()
    .setCustomId("verificationBtn")
    .setLabel("Verify")
    .setStyle(ButtonStyle.Primary);
  const row =
    new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
      verification,
    );
  channel.send({
    content:
      "Bitte hier verifizieren. Dazu einfach den Button darunter klicken",
    components: [row],
  });
  client.destroy();
});

client.login(TOKEN);
