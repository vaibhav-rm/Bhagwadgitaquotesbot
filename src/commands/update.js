const {	SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../config.json')
const { update } = config
const { name, description, subcommands } = update

const option_last = subcommands.last.option
const options_item = subcommands.item.options

module.exports = {
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription(description)

		.addSubcommand(sub =>
			sub.setName(subcommands.last.name)
			.setDescription(subcommands.last.description)
			.addStringOption(opt => 
				opt.setName(option_last.name)
					.setDescription(option_last.description)
					.setRequired(true)))

		.addSubcommand(sub =>
			sub.setName(subcommands.item.name)
			.setDescription(subcommands.item.description)
			.addStringOption(opt =>
				opt.setName(options_item.old.name)
				.setDescription(options_item.old.description)
				.setRequired(true))
			.addStringOption(opt =>
				opt.setName(options_item.new.name)
				.setDescription(options_item.new.description)
				.setRequired(true))),

	async execute(interaction) {

		const { reply } = update
		
		// Only if user is captain
		if (process.env.CAPTAIN_IDS.includes(interaction.user.id)) {

			console.log(`Author id ${interaction.user.username} is a captain, arrr`)

			// Update last item	
			if (interaction.options.getSubcommand() === subcommands.last.name) {
				const { last } = reply.error
				const quote_new = interaction.options.getString(option_last.name)
				if (quote_new.includes("<@!")) {
					console.log(`Message contains mention, skipping`)
					return interaction.reply({content: reply.error.last.mention,ephemeral: true})
				} else {
					dbUpdateLast(quote_new).then(function (result) {
						switch (result) {
							case "error":
								interaction.reply({ content: config.error_generic, ephemeral: true })
							case "error-no-changes":
								interaction.reply({ content: last.similar, ephemeral: true })
							case "error-duplicate":
								interaction.reply({ content: last.duplicate, ephemeral: true })
							case "error-not-found":
								interaction.reply({ content: last.notfound, ephemeral: true })
							default:
								interaction.reply(`${reply.success.title}\n${reply.success.prefix_old}\n${result}\n${reply.success.prefix_new}\n${quote_new}`)
						}
					})
				}
			}
			
			// Update selected item
			if (interaction.options.getSubcommand() === subcommands.item.name) {
				const { item } = reply.error
				const quote_old = interaction.options.getString(options_item.old.name)
				const quote_new = interaction.options.getString(options_item.new.name)
				if (quote_new.includes("<@!")) {
					console.log(`Message contains mention, skipping`)
					interaction.reply({content: reply.error.item.mention ,ephemeral: true})
				} else {
					dbUpdateItem(quote_old, quote_new).then(function (result) {
						switch (result) {	
							case "success":
								interaction.reply(`${reply.success.title}\n${reply.success.prefix_old}\n${quote_old}\n${reply.success.prefix_new}\n${quote_new}`)
							case "error-no-changes":
								interaction.reply({ content: item.similar, ephemeral: true })
							case "error-duplicate":
								interaction.reply({ content: item.duplicate, ephemeral: true })
							case "error-not-found":
								interaction.reply({ content: item.notfound, ephemeral: true })
							case "error":
								interaction.reply({ content: config.error_generic, ephemeral: true })
						}
					})
				}
			}

		} else {
			console.log(require('chalk').red(`Author id ${interaction.user.username} is not a captain. Abort!`))
			interaction.reply({content: reply.error.rights, ephemeral: true})
		}
	}

}