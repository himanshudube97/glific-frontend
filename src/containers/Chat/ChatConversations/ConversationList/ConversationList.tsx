import React, { useEffect } from 'react';
import { List, Container } from '@material-ui/core';
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client';
import moment from 'moment';

import ChatConversation from '../ChatConversation/ChatConversation';
import Loading from '../../../../components/UI/Layout/Loading/Loading';
import { SEARCH_QUERY } from '../../../../graphql/queries/Search';
import { setErrorMessage } from '../../../../common/notification';
import { SEARCH_QUERY_VARIABLES } from '../../../../common/constants';
import styles from './ConversationList.module.css';

interface ConversationListProps {
  searchVal: string;
  selectedContactId: number;
  setSelectedContactId: (i: number) => void;
  savedSearchCriteria: string | null;
  searchParam?: any;
}

export const ConversationList: React.SFC<ConversationListProps> = (props) => {
  const client = useApolloClient();
  const queryVariables = SEARCH_QUERY_VARIABLES;

  const { loading: conversationLoading, error: conversationError, data } = useQuery<any>(
    SEARCH_QUERY,
    {
      variables: queryVariables,
      fetchPolicy: 'cache-first',
    }
  );
  const filterVariables = () => {
    if (props.savedSearchCriteria && Object.keys(props.searchParam).length === 0) {
      let variables = JSON.parse(props.savedSearchCriteria);
      if (props.searchVal) variables.filter.term = props.searchVal;
      return variables;
    }

    let filter: any = {};
    if (props.searchVal) {
      filter.term = props.searchVal;
    }
    let params = props.searchParam;
    if (params) {
      if (params.includeTags && params.includeTags.length > 0)
        filter.includeTags = params.includeTags.map((obj: any) => obj.id);
      if (params.includeGroups && params.includeGroups.length > 0)
        filter.includeGroups = params.includeGroups.map((obj: any) => obj.id);
      if (params.includeUsers && params.includeUsers.length > 0)
        filter.includeUsers = params.includeUsers.map((obj: any) => obj.id);
      if (params.dateFrom) {
        filter.dateRange = {
          from: moment(params.dateFrom).format('YYYY-MM-DD'),
          to: moment(params.dateTo).format('YYYY-MM-DD'),
        };
      }
    }

    return {
      filter: filter,
      messageOpts: {
        limit: 50,
      },
      contactOpts: {
        limit: 50,
      },
    };
  };

  useEffect(() => {
    getFilterConvos({
      variables: filterVariables(),
    });
  }, [props.searchVal, props.searchParam, props.savedSearchCriteria]);

  const [getFilterConvos, { called, loading, error, data: searchData }] = useLazyQuery<any>(
    SEARCH_QUERY
  );

  // Other cases
  if ((called && loading) || conversationLoading) return <Loading />;

  if ((called && error) || conversationError) {
    if (error) {
      setErrorMessage(client, error);
    } else if (conversationError) {
      setErrorMessage(client, conversationError);
    }

    return null;
  }

  let conversations = null;
  // Retrieving all convos or the ones searched by.
  if (data) {
    conversations = data.search;
  }

  if (called && (props.searchVal !== '' || props.savedSearchCriteria || props.searchParam)) {
    conversations = searchData.search.filter((n: any) => n.__typename === 'Conversation'); // Trying to only get conversation types from search query.
  }

  // build the conversation list only if there are conversations
  let conversationList;
  if (conversations && conversations.length > 0) {
    conversationList = conversations.map((conversation: any, index: number) => {
      let lastMessage = [];
      if (conversation.messages.length > 0) {
        lastMessage = conversation.messages[0];
      }
      return (
        <ChatConversation
          key={conversation.contact.id}
          selected={props.selectedContactId === conversation.contact.id}
          onClick={(i: number) => props.setSelectedContactId(conversation.contact.id)}
          index={index}
          contactId={conversation.contact.id}
          contactName={
            conversation.contact.name ? conversation.contact.name : conversation.contact.phone
          }
          lastMessage={lastMessage}
          senderLastMessage={conversation.contact.lastMessageAt}
          contactStatus={conversation.contact.status}
          providerStatus={conversation.contact.providerStatus}
        />
      );
    });
  } else {
    conversationList = <p data-testid="empty-result">You do not have any conversations.</p>;
  }

  return (
    <Container className={styles.ListingContainer} disableGutters>
      {conversationList ? (
        <List className={styles.StyledList}>{conversationList}</List>
      ) : (
        { conversationList }
      )}
    </Container>
  );
};

export default ConversationList;
