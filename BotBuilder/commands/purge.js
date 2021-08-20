const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purges a max of 200 messages!')
        .addIntegerOption(option=>option.setName('amount').setDescription('Number of messages to purge')),
	async execute(interaction) {
		const amount=interaction.options.getInteger('amount');

        if(amount<=1 || amount>200){
            return interaction.reply({
                content: `You need to input a number between 1 and 200`,ephemeral: true
            })
        }
        await interaction.channel.bulkDelete(amount,true).catch(error=>{
            console.error(error)
            interaction.reply({
                content: 'There was an error trying to purge messages in this channel!', ephemeral:true
            })
        })

        return interaction.reply({
            content: `Successfully pruned \`${amount}\` messages.`, ephemeral: true
        });
	},
};