import discord
import os
from discord import app_commands
from discord.utils import get

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)

@client.event
async def on_ready():
    await tree.sync()
    print("Ready!")


@tree.command(name = "verify", description = "Let's get you verified")

@app_commands.describe(name="zB: Max")
@app_commands.rename(name='vorname')

@app_commands.describe(name="zB: Max123")
@app_commands.rename(name='ingame_name')

@app_commands.describe(name="zB: 5A")
@app_commands.rename(name='klasse')

async def verify(interaction, name: str, ingame_name: str, klasse: str):

    myName          = name.capitalize()
    myIngameName    = ingame_name
    myKlasse        = klasse.upper()

    user = interaction.user
    role = discord.utils.get(user.guild.roles, name="Verified")

    if user and role: await user.add_roles(role)

    await user.edit(nick=(myName + " | " + myKlasse))

    os.system("mscs send rohrbach whitelist add " + myIngameName)


    await interaction.response.send_message("Hallo " + myName + " aka '" + myIngameName + "' aus der " + myKlasse + ". Du wurdest erfolgreich verifiziert!", ephemeral=True)
    


@tree.command(name = "unverify")
async def unverify(interaction):

    user = interaction.user
    role = discord.utils.get(user.guild.roles, name="Verified")

    if user and role: await user.remove_roles(role)

    await interaction.response.send_message("Du wurdest erfolgreich unverified!", ephemeral=True)

client.run(applicaiton_id)
