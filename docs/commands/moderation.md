# Moderation

Command | Description | Usage | Permission Level
--------|-------------|-------|-----------------
Adcheck | Search for Discord invite links in members playing statuses | `adcheck ` | Moderator
Ban | Bans a user with an optional reason | `ban <member:user> [reason:string]` | Moderator
Forceban | Bans a user that is not already on the server | `forceban <member:user> [reason:string]` | Administrator
Kick | Kicks a user with an optional reason | `kick <member:user> [reason:string]` | Moderator
Mute | Mutes a user with an optional reason | `mute <member:user> <reason:string>` | Moderator
Purge | Purges either a mentioned users messages (between 2 and 99), or the bots own messages. | `purge [member:user] <number:integer>` | Moderator
Reason | Sets the reason for an infraction with a previously unset reason | `reason <case:integer> <reason:string>` | Moderator
Softban | Bans and then unbans a user to delete their messages | Usage: `softban <@mention> <reason>` | Moderator
Unmute | Unmutes a user with an optional reason | `mute <member:user> <reason:string>` | Moderator
Warn | Warns a user with an optional reason | `warn <member:user> <reason:string>` | Moderator