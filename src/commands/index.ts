import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import * as ping from "./ping";

interface Command {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction): Promise<void>;
}

type Commands = { ping: Command };

export const commands: Commands = { ping };

export const commandsArray = Object.values(commands);

export function isOfCommands(
  commandName: string,
): commandName is keyof Commands {
  return commandName in commands;
}
