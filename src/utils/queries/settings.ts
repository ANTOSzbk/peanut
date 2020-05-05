import { PRODUCTION } from '../constants';
import gql from 'graphql-tag';

export const QUERY = {
  SETTINGS: gql`
    query {
      settings${PRODUCTION ? '' : 'Dev'} {
        guild
        settings
        }
      }
		`,
};

export const MUTATION = {
  UPDATE_SETTINGS: gql`
    mutation($guild: String!, $settings: jsonb!) {
      insert_settings${PRODUCTION ? '' : 'Dev'}(
        objects: { guild: $guild, settings: $settings }
        on_conflict: { constraint: settings${
          PRODUCTION ? '' : 'Dev'
        }_pkey, update_columns: settings }
      ) {
        returning {
          settings
          guild
        }
      }
    }
  `,
  DELETE_SETTINGS: gql`
    mutation($guild: String!) {
      delete_settings${
        PRODUCTION ? '' : 'Dev'
      }(where: { guild: { _eq: $guild } }) {
        returning {
          guild
          settings
        }
      }
    }
  `,
};
