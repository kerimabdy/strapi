import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { GuidedTourProvider } from '@strapi/helper-plugin';
import reducer, { initialState } from './reducer';

const GuidedTour = ({ children }) => {
  const [{ currentStep, guidedTourState, isGuidedTourVisible, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const setCurrentStep = step => {
    dispatch({
      type: 'SET_CURRENT_STEP',
      step,
    });
  };

  const setStepState = (section, step, value) => {
    dispatch({
      type: 'SET_STEP_STATE',
      section,
      step,
      value
    });
  };

  const setGuidedTourVisibility = value => {
    dispatch({
      type: 'SET_GUIDED_TOUR_VISIBILITY',
      value,
    });
  };

  const setIsActive = value => {
    dispatch({
      type: 'SET_IS_ACTIVE',
      value,
    });
  };

  return (
    <GuidedTourProvider
      guidedTourState={guidedTourState}
      currentStep={currentStep}
      isActive={isActive}
      setCurrentStep={setCurrentStep}
      setGuidedTourVisibility={setGuidedTourVisibility}
      setIsActive={setIsActive}
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
