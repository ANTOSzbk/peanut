import { PRODUCTION } from '../constants';
import gql from 'graphql-tag';

export const QUERY = {
  CASES: gql`
  query($guild: String!, $caseId: [Int!]!) {
    cases${PRODUCTION ? '' : 'Dev'}(where: {
      guild: { _eq: $guild },
      case_id: { _in: $caseId }
    }) {
      action
      action_duration
      action_processed
      case_id
      created_at
      guild
      id
      message
      mod_id
      mod_tag
      reason
      ref_id
      target_id
      target_tag
    }
  }
`,

  LOG_CASE: gql`
  query($guild: String!, $caseId: Int!) {
    cases${PRODUCTION ? '' : 'Dev'}(where: {
      guild: { _eq: $guild },
      case_id: { _eq: $caseId }
    }, order_by: { case_id: asc }) {
      id
      message
    }
  }
`,

  HISTORY_CASE: gql`
  query($targetId: String!) {
    cases${PRODUCTION ? '' : 'Dev'}(where: {
      target_id: { _eq: $targetId }
    }) {
      action
    }
  }
`,

  FIX_CASES: gql`
  query($guild: String!, $caseId: Int!) {
    cases${PRODUCTION ? '' : 'Dev'}(where: {
      guild: { _eq: $guild },
      case_id: { _gt: $caseId }
    }, order_by: { case_id: asc }) {
      id
      message
    }
  }
`,

  MUTES: gql`
  query($actionDuration: timestamptz!, $actionProcessed: Boolean!) {
    cases${PRODUCTION ? '' : 'Staging'}(where: {
      action_duration: { _gt: $actionDuration },
      action_processed: { _eq: $actionProcessed }
    }) {
      action_duration
      guild
      id
      target_id
      target_tag
    }
  }
`,

  MUTE_DURATION: gql`
  query($guild: String!, $caseId: Int!, $action: Int!, $actionProcessed: Boolean!) {
    cases${PRODUCTION ? '' : 'Dev'}(where: {
      guild: { _eq: $guild },
      case_id: { _eq: $caseId },
      action: { _eq: $action },
      action_processed: { _eq: $actionProcessed }
    }) {
      action
      action_duration
      action_processed
      case_id
      created_at
      guild
      id
      message
      mute_message
      mod_id
      mod_tag
      reason
      ref_id
      target_id
      target_tag
    }
  }
`,

  MUTE_MEMBER: gql`
  query($guild: String!, $targetId: String!, $actionProcessed: Boolean!) {
    cases${PRODUCTION ? '' : 'Dev'}(where: {
      guild: { _eq: $guild },
      target_id: { _eq: $targetId },
      action_processed: { _eq: $actionProcessed },
    }) {
      action
      action_duration
      action_processed
      case_id
      created_at
      guild
      id
      message
      mute_message
      mod_id
      mod_tag
      reason
      ref_id
      target_id
      target_tag
    }
  }
`,
};

export const MUTATION = {
  INSERT_CASES: gql`
    mutation(
      $case_id: Int!
      $mute_message: String
      $ref_id: Int
      $mod_tag: String
      $mod_id: String
      $message: String
      $guild: String!
      $action: Int!
      $action_duration: timestamptz
      $action_processed: Boolean
      $reason: String
      $target_id: String
      $target_tag: String
    ) {
      insert_cases${PRODUCTION ? '' : 'Dev'}(
        objects: {
          action: $action
          action_duration: $action_duration
          action_processed: $action_processed
          case_id: $case_id
          guild: $guild
          message: $message
          mod_id: $mod_id
          mod_tag: $mod_tag
          mute_message: $mute_message
          reason: $reason
          ref_id: $ref_id
          target_id: $target_id
          target_tag: $target_tag
        }
      ) {
        returning {
          action
          action_duration
          action_processed
          case_id
          created_at
          target_tag
          target_id
          ref_id
          reason
          id
          mute_message
          mod_tag
          mod_id
          message
          guild
        }
      }
    }
  `,

  LOG_CASE: gql`
  mutation($id: uuid!, $message: String!) {
    update_cases${PRODUCTION ? '' : 'Dev'}(where: {
      id: { _eq: $id }
    }, _set: { message: $message }) {
      affected_rows
    }
  }
`,

  FIX_CASE: gql`
  mutation($id: uuid!, $caseId: Int!) {
    updateCases${PRODUCTION ? '' : 'Dev'}(where: {
      id: { _eq: $id }
    }, _set: { case_id: $caseId }) {
      affected_rows
    }
  }
`,

  DELETE_CASE: gql`
  mutation($id: uuid!) {
    delete_cases${PRODUCTION ? '' : 'Dev'}(where: {
      id: { _eq: $id }
    }) {
      affected_rows
    }
  }
`,

  CANCEL_MUTE: gql`
  mutation($id: uuid!, $actionProcessed: Boolean!) {
    update_cases${PRODUCTION ? '' : 'Dev'}(where: {
      id: { _eq: $id }
    }, _set: { action_processed: $actionProcessed }) {
      affected_rows
    }
  }
`,

  UPDATE_DURATION_MUTE: gql`
  mutation($id: uuid!, $actionDuration: timestamptz!) {
    update_cases${PRODUCTION ? '' : 'Dev'}(where: {
      id: { _eq: $id }
    }, _set: { action_duration: $actionDuration }) {
      returning {
        action
          action_duration
          action_processed
          case_id
          created_at
          target_tag
          target_id
          ref_id
          reason
          id
          mute_message
          mod_tag
          mod_id
          message
          guild
      }
    }
  }
`,

  UPDATE_REASON: gql`
  mutation($id: uuid!, $modId: String!, $modTag: String!, $reason: String!) {
    update_cases${PRODUCTION ? '' : 'Dev'}(where: {
      id: { _eq: $id }
    }, _set: { mod_id: $modId, mod_tag: $modTag, reason: $reason }) {
      affected_rows
    }
  }
`,
};
