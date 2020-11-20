import {
  GET_AUTOMATION,
  GET_AUTOMATION_COUNT,
  GET_AUTOMATION_DETAILS,
} from '../graphql/queries/Automation';
import { FILTER_AUTOMATION } from '../graphql/queries/Automation';

export const getAutomationQuery = {
  request: {
    query: GET_AUTOMATION,
    variables: {
      id: 1,
    },
  },

  result: {
    data: {
      flow: {
        flow: {
          id: '1',
          name: 'Help',
          uuid: 'b050c652-65b5-4ccf-b62b-1e8b3f328676',
          keywords: ['help'],
          ignoreKeywords: false,
        },
      },
    },
  },
};

export const filterAutomationQuery = {
  request: {
    query: FILTER_AUTOMATION,
    variables: {
      filter: {
        keyword: 'help',
      },
      opts: {
        order: 'ASC',
        limit: null,
        offset: 0,
      },
    },
  },

  result: {
    data: {
      flows: [
        {
          id: '1',
          name: 'help workflow',
          uuid: 'b050c652-65b5-4ccf-b62b-1e8b3f328676',
          keywords: ['help'],
          ignoreKeywords: false,
        },
      ],
    },
  },
};

export const getAutomationDetailsQuery = {
  request: {
    query: GET_AUTOMATION_DETAILS,
    variables: {
      filter: {
        uuid: 'b050c652-65b5-4ccf-b62b-1e8b3f328676',
      },
      opts: {},
    },
  },

  result: {
    data: {
      flows: [
        {
          name: 'help workflow',
          keywords: ['help'],
        },
      ],
    },
  },
};

export const getAutomationCountQuery = {
  request: {
    query: GET_AUTOMATION_COUNT,
    variables: {
      filter: {
        name: '',
      },
    },
  },

  result: {
    data: {
      countFlows: 3,
    },
  },
};
