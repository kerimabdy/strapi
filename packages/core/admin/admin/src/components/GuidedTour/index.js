import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { GuidedTourProvider } from '@strapi/helper-plugin';
import reducer, { initialState } from './reducer';

const GuidedTour = ({ children }) => {
  const [{ currentStep, guidedTourState, isGuidedTourVisible }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const setCurrentStep = value => {
    // eslint-disable-next-line no-unused-vars
    const [section, step] = value.split('.');

    const guidedTourArray = Object.entries(guidedTourState);
    const sectionIndex = guidedTourArray.findIndex(([key]) => key === section);
    const sectionBefore = guidedTourArray.slice(0, sectionIndex);

    let areDone;

    if (sectionBefore.length > 0) {
      areDone = sectionBefore.every(([, value]) =>
        Object.entries(value).every(([, value]) => value)
      );
    }

    if (sectionBefore.length === 0 || areDone) {
      dispatch({
        type: 'SET_CURRENT_STEP',
        value,
      });
    }
  };

  const setStepState = (section, step, value) => {
    dispatch({
      type: 'SET_STEP_STATE',
      section,
      step,
      value,
    });
  };

  const setGuidedTourVisibility = value => {
    dispatch({
      type: 'SET_GUIDED_TOUR_VISIBILITY',
      value,
    });
  };

  return (
    <GuidedTourProvider
      guidedTourState={guidedTourState}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      setGuidedTourVisibility={setGuidedTourVisibility}
      setStepState={setStepState}
      isGuidedTourVisible={isGuidedTourVisible}
    >
      {children}
    </GuidedTourProvider>
  );
};

GuidedTour.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GuidedTour;
