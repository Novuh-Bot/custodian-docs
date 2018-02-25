const Social = require('../../base/Social.js');

class Deduct extends Social {
  constructor(client) {
    super(client, {
      name: 'deduct',
      description: 'Takes points away from the nominated user.',
      usage: 'deduct <@mention|userid> <amount>',
      category:'Moderation',
      extended: 'This will take points away from a nominated user.',
      cost: 5,
      hidden: true,
      aliases: ['punish', 'take'],
      botPerms: [],
      permLevel: 'Moderator'
    });
  }

  /**
   * 
   * @param {Amount} args The amount of points to deduct from the user. 
   */
  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try {
      const { lang } = this.client.settings.get(message.guild.id);
      const cmdLang = require(`../../languages/${lang}/${this.help.category}/${this.help.category}.json`);
      const generalErr = require(`../../languages/${lang}/general.json`);
      
      const user = await this.verifySocialUser(args[0]);
      if (isNaN(args[1])) throw `${generalErr.NaN}`;
      if (args[1] < 0) throw `${lang.incorrectDeductAmnt}`;
      else if (args[1] < 1) throw `${lang.incorrectDeductBal}`;
      if (message.author.id === user) throw `${lang.socialDeductYrslf}`;
      await this.cmdPun(message, user, parseInt(args[1]));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Deduct;