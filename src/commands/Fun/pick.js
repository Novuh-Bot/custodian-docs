const Command = require('../../base/Command.js');

class Pick extends Command {
  constructor(client) {
    super(client, {
      name: 'pick',
      description: 'Pick out of a list',
      category: 'Fun',
      usage: 'pick <option1>, <option2>, <option3>, <etc>',
      extended: 'This command will help you select out of a list of supplied options.',
      aliases: ['choose'],
      botPerms: ['SEND_MESSAGES']
    });
  }

  /**
   * 
   * @param {Options} args An array of choices for the bot to choose from. 
   */
  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const { lang } = this.client.settings.get(message.guild.id);
    const cmdLang = require(`../../languages/${lang}/${this.help.category}/${this.help.category}.json`);
    const generalErr = require(`../../languages/${lang}/general.json`);
    
    const options = args.join(' ');
    if (options.length < 2) throw `${message.author} |\`❌\`| ${lang.pickNoTxt}`;
    const list = options.split(',');
    if (list.length < 2)  throw `${message.author} |\`❌\`| ${lang.pickInvalidAmnt}`;  
    try {
      return message.channel.send(`${list[Math.floor(Math.random()*list.length)].trim()}`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Pick;