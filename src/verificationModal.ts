import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import config from "./config.json";
import child from "child_process";
import { appendFile } from "fs/promises";

const { VERIFIEDROLEID } = config;

export async function setupModalSubmit(interaction: ButtonInteraction) {
  const modal = new ModalBuilder()
    .setCustomId("verificationModal")
    .setTitle("Verification");

  const surnameInput = new TextInputBuilder()
    .setCustomId("surnameInput")
    .setLabel("Was ist dein Vorname")
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("Max")
    .setRequired(true);

  const usernameInput = new TextInputBuilder()
    .setCustomId("usernameInput")
    .setLabel("Was ist dein Minecraft Ingame Name")
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("xX_Max_Xx")
    .setRequired(true);

  const classInput = new TextInputBuilder()
    .setCustomId("classInput")
    .setLabel("In welche Klasse gehst du?")
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("5G")
    .setRequired(true);

  const firstActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      surnameInput,
    );
  const secondActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      usernameInput,
    );
  const thirdActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      classInput,
    );

  modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

  await interaction.showModal(modal);
}

export async function modalResponse(interaction: ButtonInteraction) {
  const filter = (interaction: ModalSubmitInteraction) =>
    interaction.customId === "verificationModal";

  const modalInteraction = await interaction.awaitModalSubmit({
    filter,
    time: 30_000,
  });

  const surnameRes = modalInteraction.fields.getTextInputValue("surnameInput");
  const usernameRes =
    modalInteraction.fields.getTextInputValue("usernameInput");
  const classRes = modalInteraction.fields.getTextInputValue("classInput");

  const surnameCap = surnameRes.charAt(0).toUpperCase() + surnameRes.slice(1);
  const classCap = classRes.toUpperCase();

  if (!interaction.inCachedGuild()) return;
  interaction.member.roles.add(VERIFIEDROLEID);
  // myName + " | " + myKlasse
  interaction.member.setNickname(`${surnameCap} | ${classCap}`);

  // os.system("mscs send rohrbach whitelist add " + myIngameName)
  child.exec(`mscs send rohrbach whitelist add ${usernameRes}`);

  modalInteraction.reply({
    content: `Hallo ${surnameCap} aka ${usernameRes} aus der ${classCap}. Du wurdest erfolgreich verifiziert!`,
    ephemeral: true,
  });

  const currentDate = new Date();
  appendFile(
    "logs.output",
    `${currentDate} Hallo ${surnameCap} aka ${usernameRes} aus der ${classCap}. Du wurdest erfolgreich verifiziert!\n`,
  );
}
