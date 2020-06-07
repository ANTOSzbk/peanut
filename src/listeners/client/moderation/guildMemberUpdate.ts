import { Listener, PrefixSupplier } from 'discord-akairo';
import { GuildMember, Message, TextChannel } from 'discord.js';
import {
  ACTIONS,
  COLORS,
  PRODUCTION,
  SETTINGS,
} from '../../../utils/constants';
import { graphQLClient } from '../../../utils/graphQL/apolloClient';
import { Cases, CasesInsertInput } from '../../../utils/graphQL/graphQLTypes';
import { QUERY } from '../../../utils/queries/cases';

export default class GuildMemberUpdateModerationListener extends Listener {
  public constructor() {
    super('guildMemberUpdateModeration', {
      emitter: 'client',
      event: 'guildMemberUpdate',
      category: 'client',
    });
  }

  public async exec(oldMember: GuildMember, newMember: GuildMember) {
    const moderation = this.client.settings.get(
      newMember.guild,
      SETTINGS.MODERATION
    );
    if (moderation) {
      if (
        this.client.caseHandler.cachedCases.delete(
          `${newMember.guild.id}:${newMember.id}:MUTE`
        )
      )
        return;
      if (
        this.client.caseHandler.cachedCases.delete(
          `${newMember.guild.id}:${newMember.id}:EMBED`
        )
      )
        return;
      if (
        this.client.caseHandler.cachedCases.delete(
          `${newMember.guild.id}:${newMember.id}:EMOJI`
        )
      )
        return;
      if (
        this.client.caseHandler.cachedCases.delete(
          `${newMember.guild.id}:${newMember.id}:REACTION`
        )
      )
        return;
      if (
        this.client.caseHandler.cachedCases.delete(
          `${newMember.guild.id}:${newMember.id}:TAG`
        )
      )
        return;

      const modRole = this.client.settings.get(
        newMember.guild,
        SETTINGS.MOD_ROLE
      );
      if (modRole && newMember.roles.cache.has(modRole)) return;
      const muteRole = this.client.settings.get(
        newMember.guild,
        SETTINGS.MUTE_ROLE
      );
      if (!muteRole) return;
      const modLogChannel = this.client.settings.get(
        newMember.guild,
        SETTINGS.MOD_LOG
      );
      const role = newMember.roles.cache
        .filter(
          (r) => r.id !== newMember.guild.id && !oldMember.roles.cache.has(r.id)
        )
        .first();
      if (!role) {
        if (
          oldMember.roles.cache.has(muteRole) &&
          !newMember.roles.cache.has(muteRole)
        ) {
          const { data } = await graphQLClient.query<any, CasesInsertInput>({
            query: QUERY.MUTE_MEMBER,
            variables: {
              guild: newMember.guild.id,
              target_id: newMember.id,
              action_processed: false,
            },
          });
          let dbCase: Cases;
          if (PRODUCTION) dbCase = data.cases[0];
          else dbCase = data.casesDev[0];
          if (dbCase) this.client.muteScheduler.cancel(dbCase);
        }
        return;
      }

      let actionName;
      let action: number;
      let processed = true;
      switch (role.id) {
        case muteRole:
          actionName = 'Mute';
          action = ACTIONS.MUTE;
          processed = false;
          break;
        default:
          return;
      }

      const totalCases =
        this.client.settings.get(newMember.guild, SETTINGS.CASES, 0) + 1;
      this.client.settings.set(newMember.guild, SETTINGS.CASES, totalCases);

      let modMessage;
      if (modLogChannel) {
        const prefix = (this.client.commandHandler.prefix as PrefixSupplier)({
          guild: newMember.guild,
        } as Message);
        const reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;
        const color = ACTIONS[action] as keyof typeof ACTIONS;
        const embed = (
          await this.client.caseHandler.log({
            member: newMember,
            action: actionName,
            caseNum: totalCases,
            reason,
            message: { author: null, guild: newMember.guild },
            nsfw: true,
          })
        ).setColor(COLORS[color]);
        modMessage = await (this.client.channels.cache.get(
          modLogChannel
        ) as TextChannel).send(embed);
      }

      await this.client.caseHandler.create({
        guild: newMember.guild.id,
        message: modMessage?.id,
        case_id: totalCases,
        target_id: newMember.id,
        target_tag: newMember.user.tag,
        action,
        action_processed: processed,
      });
    }
  }
}
