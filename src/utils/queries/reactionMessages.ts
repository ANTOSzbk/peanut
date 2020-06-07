import { PRODUCTION } from '../constants';
import gql from 'graphql-tag';

export const QUERY = {
  REACTION_MESSAGES: gql`
    query {
      reactionMessages${PRODUCTION ? '' : 'Dev'} {
        channel
        message
        reactions
        disabled
        }
      }
		`,
};

export const MUTATION = {
  INSERT_REACTION_MESSAGES: gql`
    mutation($channel: String!, $message: String!, $reactions: jsonb!, $disabled: Boolean) {
      insert_reactionMessages${PRODUCTION ? '' : 'Dev'}(
        objects: {channel: $channel, message: $message, reactions: $reactions, disabled: $disabled}
        on_conflict: { constraint: reactionMessages${
          PRODUCTION ? '' : 'Dev'
        }_pkey, update_columns: reactions }
      ) {
        returning {
          reactions
          message
          channel
          disabled
        }
      }
    }
  `,
  UPDATE_REACTION_MESSAGES: gql`
    mutation(
      $message: String!,
      $reactions: jsonb!,
      $disabled: Boolean,
      $channel: String!
    ) {
      update_reactionMessages${PRODUCTION ? '' : 'Dev'}(
        _set: { channel: $channel, disabled: $disabled, reactions: $reactions }
        where: { message: { _eq: $message } }
      ) {
        returning {
          channel
          disabled
          message
          reactions
        }
      }
    }
  `,

  DELETE_REACTION_MESSAGES: gql`
    mutation($message: String!) {
      delete_reactionMessages${PRODUCTION ? '' : 'Dev'}(where: { message: { _eq: $message } }) {
        returning {
          channel
          message
          reactions
          disabled
        }
      }
    }
  `,
};
