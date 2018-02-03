const Social = require('../../base/Social.js');
const snek = require('snekfetch');

class Reddit extends Social {
  constructor(client) {
    super(client, {
      name: 'reddit',
      description: 'Posts a random subreddit entry.',
      usage: 'reddit [-new|-random|-hot|-top] [subreddit]',
      category: 'Fun',
      botPerms: ['SEND_MESSAGES'],
    });
  }

  async run(message, args, level) {
    const subreddit = args.join(' ') || 'random';
    const subRedCat = message.flags[0] || 'random';
    try {
      const { body } = await snek.get(`https://www.reddit.com/r/${subreddit}/${subRedCat}.json`);
      let meme;
      if (subRedCat === 'random' || !message.flags[0]) meme = body[0].data.children[Math.floor(Math.random() * body[0].data.children.length)].data;
      else meme = body.data.children[Math.floor(Math.random() * body.data.children.length)].data;

      if (!message.channel.nsfw && meme.over_18) {
        throw 'Cannot display NSFW content in a SFW channel.';
      }
      const msg = await message.channel.send(`'Fetching from ${meme.subreddit_name_prefixed}...'`);
      await message.channel.send(`${meme.title} submitted by ${meme.author} in ${meme.subreddit_name_prefixed}\nUpvote Ratio ${meme.upvote_ratio}\n${meme.url}`);
      msg.delete();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Reddit;