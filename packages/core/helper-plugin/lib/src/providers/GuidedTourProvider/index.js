/**
 *
 * GuidedTourProvider
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import GuidedTourContext from '../../contexts/GuidedTourContext';

const GuidedTourProvider = ({
  children,
  currentStep,
  setStep,
  guidedTourState,
  setGuidedTourVisibility,
  setIsActive,
  isActive,
  isGuidedTourVisible,
}) => {
  return (
    <GuidedTourContext.Provider
      value={{
        currentStep,
        guidedTourState,
        setStep,
        isActive,
        setGuidedTourVisibility,
        setIsActive,
        isGuidedTourVisible,
      }}
    >
      {children}
    </GuidedTourContext.Provider>
  );
};

GuidedTourProvider.defaultProps = {
  currentStep: null,
  isGuidedTourVisible: false,
  isActive: false,
};

GuidedTourProvider.propTypes = {
  children: PropTypes.node.isRequired,
  currentStep: PropTypes.string,
  guidedTourState: PropTypes.objectOf(
    PropTypes.shape({
      create: PropTypes.bool,
      success: PropTypes.bool,
    })
  ).isRequired,
  isGuidedTourVisible: PropTypes.bool,
  isActive: PropTypes.bool,
  setStep: PropTypes.func.isRequired,
  setGuidedTourVisibility: PropTypes.func.isRequired,
  setIsActive: PropTypes.func.isRequired,
};

export default GuidedTourProvider;
