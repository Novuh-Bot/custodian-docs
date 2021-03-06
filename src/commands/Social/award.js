const Social = require('../../base/Social.js');

class Award extends Social {
  constructor(client) {
    super(client, {
      name: 'award',
      description: 'Gives a nominated user points.',
      usage: 'award <@mention|userid> <amount>',
      category:'Moderation',
      extended: 'This will give points to a nominated user.',
      cost: 0,
      hidden: true,
      aliases: ['reward', 'give'],
      botPerms: [],
      permLevel: 'Moderator'
    });
  }

  /**
   * 
   * @param {Amount} args The amount of points to award to the user. 
   */
  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try {
      const { lang } = this.client.settings.get(message.guild.id);
      const cmdLang = require(`../../languages/${lang}/${this.help.category}/${this.help.category}.json`);
      const generalErr = require(`../../languages/${lang}/general.json`);
      
      const user = await this.verifySocialUser(args[0]);
      if (isNaN(args[1])) throw `${generalErr.NaN}`;
      if (args[1] < 0) throw `${lang.incorrectSocialAmnt}`;
      else if (args[1] < 1) throw `${lang.incorrectPayBal}`;
      if (message.author.id === user) throw `${lang.socialAwardYrslf}`;
      await this.cmdRew(message, user, parseInt(args[1]));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Award;