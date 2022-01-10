import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { GuidedTourProvider } from '@strapi/helper-plugin';
import reducer, { initialState } from './reducer';

const GuidedTour = ({ children }) => {
  const [{ currentStep, guidedTourState, isGuidedTourVisible, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const setStep = step => {
    dispatch({
      type: 'SET_CURRENT_STEP',
      step,
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
      setStep={setStep}
      setGuidedTourVisibility={setGuidedTourVisibility}
      setIsActive={setIsActive}
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
