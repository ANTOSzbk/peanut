import { PRODUCTION } from '../constants';
import gql from 'graphql-tag';

export const QUERY = {
  REACTION_MESSAGES: gql`
    query {
      reactionMessages${PRODUCTION ? '' : 'Dev'} {
        channel
        message
        reactions
        }
      }
		`,
};

export const MUTATION = {
  UPDATE_REACTION_MESSAGES: gql`
    mutation($channel: String!, $message: String!, $reactions: jsonb!) {
      insert_reactionMessages${PRODUCTION ? '' : 'Dev'}(
        objects: {channel: $channel, message: $message, reactions: $reactions }
        on_conflict: { constraint: reactionMessages${
          PRODUCTION ? '' : 'Dev'
        }_pkey, update_columns: reactions }
      ) {
        returning {
          reactions
          message
          channel
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
        }
      }
    }
  `,
};
