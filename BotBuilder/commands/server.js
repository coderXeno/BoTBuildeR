const {SlashCommandBuilder}=require('@discordjs/builders');
const { execute } = require('./ping');

module.exports={
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Display server info'),
    async execute(interaction){
        return interaction.reply(`Server name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}`)
    }
}