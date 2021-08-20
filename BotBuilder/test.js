const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs=require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands=new Collection();

const commandFiles=fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command=require(`./commands/${file}`)
    client.commands.set(command.data.name,commmand);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
    const {commandName}=interaction;

	if (!client.commands.has(commandName)) return;
	
    try{
        await client.commands.get(commandName).execute(interaction);
    } catch(error){
        console.error(error);
        return interaction.reply({
            content: 'There was an error while executing this command!', ephemeral: true
        })
    }
});

client.login(token);

// other useful logs info
// for an if else chain
//const { commandName } = interaction;
// if (commandName === 'ping') {
	// 	await interaction.reply('Pong!');
	// } else if (commandName === 'beep') {
	// 	await interaction.reply('Boop!');
	// } else if (commandName === 'server') {
	// 	await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	// } else if (commandName === 'user-info') {
	// 	await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
	// }