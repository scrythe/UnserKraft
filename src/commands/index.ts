import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import * as verify from "./verify";

interface Command {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction): Promise<void>;
}

type Commands = { verify: Command };

export const commands: Commands = { verify };

export const commandsArray = Object.values(commands);

export function isOfCommands(
  commandName: string,
): commandName is keyof Commands {
  return commandName in commands;
}
