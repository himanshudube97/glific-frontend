import React, { useState, useEffect, Suspense } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import 'i18n/config';
import { ClearCacheProvider, useClearCacheCtx } from 'react-clear-cache';

import 'assets/fonts/fonts.css';
import gqlClient from 'config/apolloclient';
import { SessionContext } from 'context/session';
import { ErrorHandler } from 'containers/ErrorHandler/ErrorHandler';
import { checkAuthStatusService, getUserSession } from 'services/AuthService';
import { UnauthenticatedRoute } from 'route/UnauthenticatedRoute/UnauthenticatedRoute';
import { AuthenticatedRoute } from 'route/AuthenticatedRoute/AuthenticatedRoute';
import { Logout } from 'containers/Auth/Logout/Logout';
import { Loading } from 'components/UI/Layout/Loading/Loading';
import { CLEAR_CACHE_DURATION } from 'common/constants';
import setLogs from 'config/logs';

const App = () => {
  const { isLatestVersion, emptyCacheStorage } = useClearCacheCtx();
  const history = useHistory();
  const [GQLClient, setGqlClient] = useState<any>();
  // by default, do not assign any value to assume login or logout
  // let's checkAuthStatusService allocate it on useEffect
  const [authenticated, setAuthenticated] = useState<any>();

  // if not the latest version empty cache
  if (!isLatestVersion && emptyCacheStorage) {
    setLogs(`Empty cache storage for user id -${getUserSession('id')}`, 'info');
    emptyCacheStorage();
  }

  useEffect(() => {
    setAuthenticated(checkAuthStatusService());
  }, []);

  const values = {
    authenticated,
    setAuthenticated: (value: any) => {
      setAuthenticated(value);
    },
  };

  let routes;

  if (authenticated !== undefined) {
    if (authenticated) {
      routes = <AuthenticatedRoute />;
    } else {
      routes = <UnauthenticatedRoute />;
    }

    // For logout action, we don't need to check if the user is logged in or not. Hence, adding it at top level
    routes = (
      <Switch>
        <Route path="/logout/:mode" component={Logout} />
        {routes}
      </Switch>
    );
  }

  useEffect(() => {
    gqlClient(history).then((value) => {
      setGqlClient(value);
    });
  }, []);

  if (GQLClient) {
    return (
      <SessionContext.Provider value={values}>
        <ApolloProvider client={GQLClient}>
          <ErrorHandler />
          <ClearCacheProvider duration={CLEAR_CACHE_DURATION}>
            <Suspense fallback={<Loading />}>{routes}</Suspense>
          </ClearCacheProvider>
        </ApolloProvider>
      </SessionContext.Provider>
    );
  }

  return null;
};

export default App;
