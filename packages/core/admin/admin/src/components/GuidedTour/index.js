import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { GuidedTourProvider } from '@strapi/helper-plugin';
import reducer, { initialState } from './reducer';
import { arePreviousSectionsDone } from './utils/arePreviousSectionsDone';
import { setStateToLocaleStorage } from './utils/setStateToLocaleStorage';
import init from './init';

const GuidedTour = ({ children }) => {
  const [{ currentStep, guidedTourState, isGuidedTourVisible }, dispatch] = useReducer(
    reducer,
    initialState,
    init
  );

  const setCurrentStep = value => {
    const toDispatch = arePreviousSectionsDone(value, guidedTourState) ? value : null;

    dispatch({
      type: 'SET_CURRENT_STEP',
      value: toDispatch,
    });
  };

  const setStepState = (section, step, value) => {
    setStateToLocaleStorage(section, step);

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
