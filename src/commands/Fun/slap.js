const Command = require('../../base/Command.js');

class Slap extends Command {
  constructor(client) {
    super(client, {
      name: 'slap',
      description: 'Slaps a mentioned user',
      extended: 'Slaps the user that you mentioned.',
      category: 'Fun',
      usage: 'slap <@mention>',
      botPerms: ['SEND_MESSAGES'],
      permLevel: 'User'
    });
  }
  /**
   * 
   * @param {Member} args A member to slap.
   */  
  async run(message, args, level) {
    const { lang } = this.client.settings.get(message.guild.id);
    const cmdLang = require(`../../languages/${lang}/${this.help.category}/${this.help.category}.json`);
    const generalErr = require(`../../languages/${lang}/general.json`);
    
    const target = message.mentions.users.first();
    if (message.mentions.users.first() < 1) return message.reply(`${lang.slapNoMntn}`);
    message.channel.send(`${message.author.username} slapped ${target}. OOOOOOOO`);
  }
}

module.exports = Slap;