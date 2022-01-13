/**
 *
 * App
 *
 */

import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { LoadingIndicatorPage, CheckPagePermissions, useGuidedTour } from '@strapi/helper-plugin';
import { Layout } from '@strapi/design-system/Layout';
import pluginPermissions from '../../permissions';
import pluginId from '../../pluginId';
import DataManagerProvider from '../../components/DataManagerProvider';
import FormModalNavigationProvider from '../../components/FormModalNavigationProvider';
import RecursivePath from '../RecursivePath';
import icons from './utils/icons.json';
import updateGuidedTourStateCTB from './utils/updateGuidedTourStateCTB';
import ContentTypeBuilderNav from '../../components/ContentTypeBuilderNav';

const ListView = lazy(() => import('../ListView'));

const App = () => {
  const { formatMessage } = useIntl();
  const title = formatMessage({
    id: `${pluginId}.plugin.name`,
    defaultMessage: 'Content Types Builder',
  });

  const { setCurrentStep, guidedTourState } = useGuidedTour();
  const setCurrentStepRef = useRef(setCurrentStep);

  const contentTypeBuilderSteps = guidedTourState.contentTypeBuilder;
  const stepToShow = Object.entries(contentTypeBuilderSteps).find(([, value]) => value === false);
  const [stepName] = stepToShow || [];

  const stepToShowRef = useRef(stepName);

  useEffect(() => {
    const didAlreadyCreateAContentType = localStorage.getItem('GUIDED_TOUR_DID_CREATE_CT');

    if (stepToShowRef.current === 'create') {
      return setCurrentStepRef.current(`contentTypeBuilder.${stepToShowRef.current}`);
    }

    if (stepToShowRef.current === 'success' && didAlreadyCreateAContentType) {
      return setCurrentStepRef.current(`contentTypeBuilder.${stepToShowRef.current}`);
    }

    return setCurrentStepRef.current(null);
  }, []);

  return (
    <CheckPagePermissions permissions={pluginPermissions.main}>
      <Helmet title={title} />
      <FormModalNavigationProvider>
        <DataManagerProvider allIcons={icons} updateGuidedTourStateCTB={updateGuidedTourStateCTB}>
          <Layout sideNav={<ContentTypeBuilderNav />}>
            <Suspense fallback={<LoadingIndicatorPage />}>
              <Switch>
                <Route
                  path={`/plugins/${pluginId}/content-types/create-content-type`}
                  component={ListView}
                />
                <Route path={`/plugins/${pluginId}/content-types/:uid`} component={ListView} />
                <Route
                  path={`/plugins/${pluginId}/component-categories/:categoryUid`}
                  component={RecursivePath}
                />
              </Switch>
            </Suspense>
          </Layout>
        </DataManagerProvider>
      </FormModalNavigationProvider>
    </CheckPagePermissions>
  );
};

export default App;
