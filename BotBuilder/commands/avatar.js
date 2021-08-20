const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user!')
        .addUserOption(option=> option.setName('target').setDescription('The users\'s avatar to show')),
	async execute(interaction) {
		const user=interaction.options.getUser('target');
        if(user) return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({
            dynamic: true
        })}`);
        return interaction.reply(`Your Avatar: ${interaction.user.displayAvatarURL({
            dynamic:true
        })}`)
	},
};