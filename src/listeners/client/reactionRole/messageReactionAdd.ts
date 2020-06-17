
import { Listener } from 'discord-akairo';
import { MessageReaction, GuildEmoji, User } from 'discord.js';

export default class ReactionRoleMessageReactionAddListener extends Listener {
  public constructor() {
    super('reactionRoleMessageReactionAdd', {
      emitter: 'client',
      event: 'messageReactionAdd',
      category: 'client',
    });
  }

  public async exec(messageReaction: MessageReaction, user: User) {
    const rrMessage = this.client.reactionMessages.items.get(messageReaction.message.id);
    const guild = messageReaction.message.guild;
    const member = messageReaction.message.guild?.member(user);
    if (!rrMessage || !guild || !member) return;
    for (const { emoji, role } of rrMessage.reactions) {
      const rrRole = this.client.util.resolveRole(role, messageReaction.message.guild?.roles.cache!);
      try {
        if (messageReaction.emoji instanceof GuildEmoji && emoji === messageReaction.emoji.id) {
          await member.roles.add(rrRole)
          console.log(`Added role ${rrRole.name} to user ${member.user.username} by reacting with ${messageReaction.emoji.name}.`)
        }
        else if (emoji === messageReaction.emoji.toString()) {
          await member.roles.add(rrRole);
          console.log(`Added role ${rrRole.name} to user ${member.user.username} by reacting with ${messageReaction.emoji.toString()}.`)
        }
        // TODO 
        // * add support for animated emoji <a:XXXXXX:pepeJAM
      } catch {
        console.log(`${this.client.user?.username} has no permission to give this role -> ${rrRole.name} [${rrRole.id}].`)
      }
    }
  }
}