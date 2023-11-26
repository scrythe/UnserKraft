import {
  ActionRowBuilder,
  ButtonInteraction,
  CommandInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

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

  modalInteraction.reply({
    content: `Hallo ${surnameRes} aka ${usernameRes} aus der ${classRes}. Du wurdest erfolgreich verifiziert!`,
    ephemeral: true,
  });
}
