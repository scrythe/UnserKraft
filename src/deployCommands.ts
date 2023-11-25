import { REST, Routes } from "discord.js";
import { commandsArray } from "./commands";
import config from "./config.json";

const commandsData = commandsArray.map((command) => command.data);

const { TOKEN, CLIENTID, GUILDID } = config;
const rest = new REST().setToken(TOKEN);

(async () => {
  console.log(
    `Started refreshing ${commandsData.length} application (/) commands.`,
  );

  const data = (await rest.put(
    Routes.applicationGuildCommands(CLIENTID, GUILDID),
    {
      body: commandsData,
    },
  )) as Array<Object>;

  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
})();
