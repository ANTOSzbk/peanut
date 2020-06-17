import { Listener } from 'discord-akairo';
import { MessageReaction, GuildEmoji, User } from 'discord.js';

export default class ReactionRoleMessageReactionRemoveListener extends Listener {
  public constructor() {
    super('reactionRoleMessageReactionRemove', {
      emitter: 'client',
      event: 'messageReactionRemove',
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
      const hasRole = member.roles.cache.some(role => role.id === rrRole.id)
      if (!hasRole) return;
      try {
        if (messageReaction.emoji instanceof GuildEmoji && emoji === messageReaction.emoji.id) {
          await member.roles.remove(rrRole);
          console.log(`Removed role ${rrRole.name} of user ${member.user.username} by removing reaction ${messageReaction.emoji.name}.`)
        }
        else if (emoji === messageReaction.emoji.toString()) {
          await member.roles.remove(rrRole);
          console.log(`Removed role ${rrRole.name} of user ${member.user.username} by removing reaction ${messageReaction.emoji.toString()}.`)
        }
        // TODO 
        // * add support for animated emoji <a:XXXXXX:pepeJAM
      } catch {
        console.log(`${this.client.user?.username} has no permission to remove this role -> ${rrRole.name} [${rrRole.id}].`)
      }
    }
  }
}