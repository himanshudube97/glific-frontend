import { GET_CONTACT_GROUPS, GET_CONTACT, GET_CONTACT_DETAILS } from '../graphql/queries/Contact';
import { getCurrentUserQuery } from './User';
import { filterTagsQuery } from './Tag';
import { getLanguagesQuery } from '../containers/Form/FormLayout.test.helper';

export const contactGroupsQuery = {
  request: {
    query: GET_CONTACT_GROUPS,
    variables: {
      id: '2',
    },
  },
  result: {
    data: {
      contact: {
        contact: {
          groups: [
            {
              id: '1',
              label: 'Default Group',
              users: [],
            },
            {
              id: '2',
              label: 'Staff Group',
              users: [],
            },
          ],
        },
      },
    },
  },
};

export const getContactQuery = {
  request: {
    query: GET_CONTACT,
    variables: { id: 1 },
  },
  result: {
    data: {
      contact: {
        contact: {
          id: '1',
          name: 'Default User',
          phone: '+919820198765',
          language: [],
          status: 'VALID',
          providerStatus: 'SESSION_AND_HSM',
          settings: {},
          tags: [],
        },
      },
    },
  },
};

const date = new Date();

export const getContactDetailsQuery = {
  request: {
    query: GET_CONTACT_DETAILS,
    variables: { id: 1 },
  },
  result: {
    data: {
      contact: {
        contact: {
          phone: '+919820198765',
          groups: [
            {
              id: '1',
              label: 'Default group',
              users: [],
            },
          ],
          fields: {},
          lastMessageAt: date.toISOString(),
          status: 'VALID',
          providerStatus: 'SESSION_AND_HSM',
        },
      },
    },
  },
};

export const LOGGED_IN_USER_MOCK = [
  getCurrentUserQuery,
  getContactDetailsQuery,
  filterTagsQuery,
  getLanguagesQuery,
  getContactQuery,
  getContactDetailsQuery,
];
