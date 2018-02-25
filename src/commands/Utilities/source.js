const Command = require('../../base/Command.js');

class Source extends Command {
  constructor(client) {
    super(client, {
      name: 'source',
      description: 'Gives you the link for the source code.',
      category: 'Utilities',
      usage: 'source <command>',
      extended: 'This command will display the source code for a specified command. Requires you to supply the commands category.',
      botPerms: ['EMBED_LINKS', 'SEND_MESSAGES'],
      permLevel: 'User'
    });
  }

  /**
   * 
   * @param {Category} args The command category.
   * @param {Command} args The command to get. 
   */
  async run(message, args, level) {
    const { lang } = this.client.settings.get(message.guild.id);
    const cmdLang = require(`../../languages/${lang}/${this.help.category}/${this.help.category}.json`);
    const generalErr = require(`../../languages/${lang}/general.json`);
    
    const category = args[0];
    if (!args[0]) return message.reply(`${lang.srcNoCat}`);
    const command = args[1];
    if (!args[1]) return message.reply(`${lang.srcNoCmd}`);
    const source = `https://github.com/Novuh-Bot/Custodian/tree/master/commands/${category}/${command}.js`;
    message.channel.send(`This is the source code for the command ${command}. ${source}`);
  }
}

module.exports = Source;