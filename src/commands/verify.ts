import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("verify")
  .setDescription("Discord und Minecraft Account verifizieren");

export async function execute(interaction: CommandInteraction) {}
