import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { GuidedTourProvider } from '@strapi/helper-plugin';
import reducer, { initialState } from './reducer';
import { arePreviousSectionsDone } from './utils/arePreviousSectionsDone';

const GuidedTour = ({ children }) => {
  const [{ currentStep, guidedTourState, isGuidedTourVisible }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const setCurrentStep = value => {
    const toDispatch = arePreviousSectionsDone(value, guidedTourState) ? value : null;

    dispatch({
      type: 'SET_CURRENT_STEP',
      value: toDispatch,
    });
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
