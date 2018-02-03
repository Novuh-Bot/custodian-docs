const Command = require('../base/Command.js');

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      description: 'Evaluates arbitrary Javascript.',
      category:'System',
      usage: 'eval <expression>',
      aliases: ['ev'],
      permLevel: 'Bot Owner'
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const code = args.join(' ');
    try {
      const evaled = eval(code);
      const clean = await this.client.clean(this.client, evaled);
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.client.clean(this.client, err)}\n\`\`\``);
    }
  }
}

module.exports = Eval;