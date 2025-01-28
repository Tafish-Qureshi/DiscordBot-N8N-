require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Slash command registeren
const commands = [
    new SlashCommandBuilder()
        .setName('hello')
        .setDescription('De bot zegt hallo!')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.once('ready', async () => {
    console.log(`✅ Ingelogd als ${client.user.tag}`);

    try {
        console.log("🔄 Slash commands registreren...");
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log("✅ Slash commands geregistreerd!");
    } catch (error) {
        console.error("❌ Fout bij registreren:", error);
    }
});

// Reageer op slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'hello') {
        await interaction.reply(`Hallo`);
    }
});

// Start de bot
client.login(process.env.TOKEN);
